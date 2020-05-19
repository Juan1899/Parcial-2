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

const total = document.getElementById("total");
const results = document.getElementById("results");

database.ref().child("games").on("child_added",function(snapshot){
    let game = snapshot.val();
    let li = document.createElement("li");
    database.ref().child("votes").on("value",function(snapshot){
      total.textContent = "Total de votos"+" "+snapshot.numChildren();
      let numVotes = snapshot.numChildren();

      database.ref().child("games").child(game.id).child("votes").on("value",function(snapshot){
        console.log(snapshot.numChildren());
        li.textContent = game.name+" "+ Math.round(snapshot.numChildren()/numVotes*100)+" %"; 

      });

    });
    results.appendChild(li);
});