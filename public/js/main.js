var $friends = $('#friends');
var $name = $('#name');
var $occupation = $('#occupation');
var $age = $('#age');

var friendTemplate = "" + 
	"<tr>" + "<td>" + "{{name}}" + "</td>" +
	"<td>" + "{{occupation}}" + "</td>" +
	"<td>" + "{{age}}" + "</td>" +
	"<td>" + "<button id='{{id}}' class='remove btn btn-danger'>X</button>" +
	"</td>" + "</tr>";

// adding a friend
function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
}

$(document).ready(function(){
//	alert("jQuery is working");
	
	//GET Data Request
	$.ajax({
		type : 'GET',
		url : 'http://rest.learncode.academy/api/aurora/friends',
		success : function(friends){					// this is called a promise
			$.each(friends, function(i, friend) {		// .each is an iterator = (for(i=0; i<blah; i++))
				addFriend(friend);					
			});
		},
		error : function(){
			alert('Error loading friends');
		}
	});

	// POST to Add a friend
	$('#add-friend').on('click', function(){

		var friend = {
			name: $name.val(),
			occupation: $occupation.val(),
			age: $age.val()
		};

		$.ajax({
		type : 'POST',
		url : 'http://rest.learncode.academy/api/aurora/friends',
		data : friend,
		success : function(newFriend){
			addFriend(newFriend);
		},
		error : function(){
			alert('Error loading friends');
			}
		});
	});


	// DELETE friends from the table (not working)
	// TODO fix this to remove friends from table
	$friends.delegate('.remove', 'click', function(){
		var $tr = $(this).closest('tr');
		$.ajax({
			type : 'DELETE',
			url : 'http://rest.learncode.academy/api/aurora/friends' + $(this).attr('id'),
			success: 
			function(){
				$tr.fadeOut(300, function(){
					$(this).remove();
				});
			}, 
			error : function(){
				alert('Error deleting friends');
			}
		});
	});
});