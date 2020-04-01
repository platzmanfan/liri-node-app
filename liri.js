// pull our api_id from dotenv that we saved
require("dotenv").config();

// getting our keys

var keys = require("./keys.js");

// creating the packages // 

var axios = require("axios");




//creating the object from the api
// var spotify = new Spotify(keys.spotify);



// creating an input variable

var input = process.argv;
var movieinput ="";
// this is for multiple words movies to add to the url that we gonna need
for (var i = 2;i<input.length;i++){
    if (i > 2 && i < input.length) {
        movieinput = movieinput + "+" + input[i];
        
      } else {
        movieinput += input[i];
      } 
}
// creating queryUrl for axios
var queryUrl = "http://www.omdbapi.com/?t=" + movieinput + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl) // should be deleted

axios.get(queryUrl).then(
    function(response) {
      console.log("---------Title--------");
      console.log("        "+response.data.Title);
      console.log("-----------------------");
      console.log("-----Year it came out------");
      console.log("         "+response.data.Year);
      console.log("---------------------------");
      console.log("---------IMDB RATING-------");
      console.log("         "+ response.data.imdbRating);
      console.log("-----------------------------");
      console.log("--Rotten Tomatoes Value of the Moovie--");
      console.log("          "+response.data.Ratings[1].Value);
      console.log("-----------------------------");
      console.log("---------Country--------");
      console.log("          "+response.data.Country);
      console.log("------------------------");
      console.log("-----------Languages: --------");
      console.log("  "+response.data.Language);
      console.log("-------------------------------");
      console.log("----------Movie Plot-------\n");
      console.log(response.data.Plot);
      console.log("-------------------------------");
      console.log("--------Actors in this Movie-------\n");
      console.log("  "+ response.data.Actors);
      console.log("-----------------------------------");
    }).catch(function(error){
        console.log("Error", error.message)
    });