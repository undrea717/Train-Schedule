$(document).ready(function(){


// Initialize Firebase
   var config = {
    apiKey: "AIzaSyDqAk652PX8nUB40P-rz9lnOKPC1KfhFIc",
    authDomain: "train-express.firebaseapp.com",
    databaseURL: "https://train-express.firebaseio.com",
    projectId: "train-express",
    storageBucket: "train-express.appspot.com",
    messagingSenderId: "13213304412"
  };

  	firebase.initializeApp(config);

  	var database = firebase.database();

 	function addTrain(){

 		$("#submit").on("click", function() {

 			 event.preventDefault();

  
			var name = $("#name").val().trim();
  			var destination = $("#destination").val().trim();
  			var firstTrain = moment($("#first").val().trim(), "HH:mm").subtract(1, "years");
  			var frequency = $("#freq").val().trim();
  			var currentTime = moment().format("HH:mm");
			var diffTime = moment().diff(moment(firstTrain), "minutes");
			var remainder = diffTime % frequency;
			var minutesAway = frequency - remainder;
			var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

			console.log(firstTrain);
			console.log(currentTime);
			console.log(diffTime);
			console.log(remainder);
			console.log(minutesAway);
			console.log(nextArrival);


			

			database.ref().push({
   				trainName: name,
  				destination: destination,
  				frequency: frequency,
  				nextArrival: currentTime,
  				minutesAway: minutesAway
			});

			$("#name").val("");
			$("#destination").val("");
			$("#first").val("");
			$("#freq").val("");

			console.log(name);

		});
 		
 			

	};

	addTrain();

	 database.ref().on("child_added", function(childSnapshot) {

	 	var trainName = childSnapshot.val().trainName
	 	var trainDestination = childSnapshot.val().destination
	 	var trainFirst = childSnapshot.val().firstTrain
	 	var trainFrequency = childSnapshot.val().frequency
	 	var trainArrival = childSnapshot.val().nextArrival
	 	var trainMinutesAway = childSnapshot.val().minutesAway

	 	$("#trainInfo").append("<tr><td>" + trainName 
	 		+ "</td><td>" + trainDestination + "</td><td>"
	 		 + trainFrequency+ "</td><td>" + trainArrival + "</td><td>" + trainMinutesAway + "</td></tr>") ;

	 });


 


});

