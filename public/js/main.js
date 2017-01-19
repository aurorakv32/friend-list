var $friends = $('#friends');
var $name = $('#name');
var $occupation = $('#occupation');
var $age = $('#age');

var friendTemplate = "" + "<li>" + "<p><strong>Name:</strong> {{name}}</p>" + "<p><strong>Occupation:</strong> {{occupation}}</p>" + 
		"<p><strong>Age:</strong> {{age}}</p>" + "</li>";

// adding a friend
function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
}

$(document).ready(function(){
//	alert("jQuery is working");
	
	//GET Data Request
	$.ajax({
		type : 'GET',
		url : 'http://rest.learncode.academy/api/learncode/friends',
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
		url : 'http://rest.learncode.academy/api/learncode/friends',
		data : friend,
		success : function(newFriend){
			addFriend(newFriend);
		},
		error : function(){
			alert('Error loading friends');
		}
	});

	});


	// DELETE to dump 'em


});