var firebaseConfig = {
    apiKey: "AIzaSyB3VEYSwawC8QG1OeRzFUpf3SFA22AQz24",
    authDomain: "encuesta-videojuegos.firebaseapp.com",
    databaseURL: "https://encuesta-videojuegos.firebaseio.com",
    projectId: "encuesta-videojuegos",
    storageBucket: "encuesta-videojuegos.appspot.com",
    messagingSenderId: "584832105473",
    appId: "1:584832105473:web:ccec0011a55691ba4ed400",
    measurementId: "G-WNG8Y8J6J5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const database = firebase.database(); 

const votes = document.getElementById("votes");

database.ref().child("games").on("child_added",function(snapshot){
    let game = snapshot.val();
    let li = document.createElement("li");

    let link = document.createElement("a");
    link.textContent = game.name;
    link.href = "#";
    link.id = game.id;

    li.appendChild(link);
    votes.appendChild(li);

    document.getElementById(game.id).addEventListener("click",function(){
        let voteId = database.ref().child("votes").push().key;
        let date = new Date();

        let vote = new Vote(voteId,date.toLocaleString());

        database.ref().child("votes").child(voteId).set(vote);
        database.ref().child("games").child(game.id).child("votes").child(voteId).set(vote);

        alert("¡Gracias por tu voto!");

    });


});

