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

const gameName = document.getElementById("gameName");
const studio = document.getElementById("studio");
const year = document.getElementById("year");
const registerButton = document.getElementById("registerButton");
const seeResultsButton = document.getElementById("seeResultsButton");
const list = document.getElementById("list");

registerButton.addEventListener("click", gameRegister);

seeResultsButton.addEventListener("click",function(){
    window.location.href = "/results.html";
});

function gameRegister () {

    let validate = true;
    let message = "";

    if(gameName.value == "" || studio.value == "" || year.value == ""){
        validate = false;
        message = "Por favor, rellena todos los campos antes de continuar.";
    }

    if( isNaN(year.value) ){
        validate=false;
        message = "El dato ingresado debe ser un número.";
    }
    
    if(validate){
        //register game
        let id = database.ref().child("games").push().key;
        let game = new Game(id,gameName.value,studio.value,year.value);
        database.ref().child("games").child(id).set(game);

        gameName.value = "";
        studio.value = "";
        year.value = "";

        alert("¡Juego registrado exitosamente!");

    }else{
        alert(message);
    }
}

database.ref().child("games").on("child_added",function(snapshot){
    let game = snapshot.val();
    let li = document.createElement("li");
    li.textContent = game.name;
    list.appendChild(li);
});