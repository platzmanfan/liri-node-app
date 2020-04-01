// pull our api_id from dotenv that we saved
require("dotenv").config();

// getting our keys

var keys = require("./keys.js");

// creating the packages // 

var axios = require("axios");

var moment = require("moment");




//creating the object from the api
// var spotify = new Spotify(keys.spotify);



// this is for OMDB AXIOS FOR MOVIE INPUT for node liri.js movie-this


var mainInput = process.argv[2];

var input = process.argv;
console.log(input);
var movieurl ="";
// this is for multiple words movies to add to the url that we gonna need

if (input[3] == null ){
    movieurl += "Mr.Nobody";
} else{
for (var i = 3;i<input.length;i++){
    
     if (i > 3 && i < input.length) {
        movieurl = movieurl + "+" + input[i];
        
      } 
    else {
        movieurl += input[i];
      } 
    }
}


// creating queryUrl for axios
var queryUrl = "http://www.omdbapi.com/?t=" + movieurl + "&y=&plot=short&apikey=trilogy";

// creating the api request and printing out the info
var displayMovie = function(){
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
      console.log("--Rotten Tomatoes Value of the Movie--");
      if(response.data.Ratings.Value == null){
        console.log("No Rating Available")} else {
      console.log("          "+response.data.Ratings[1].Value);  };
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
        if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
           
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      
}
  
/// creating queryUrl for Bands In Town


var findConcert = function(){


var bandsUrl = "https://rest.bandsintown.com/artists/" + movieurl +"/events?app_id=codingbootcamp";
console.log(bandsUrl)
axios.get(bandsUrl).then(
    function(response){
       for(var i=0; i<response.data.length; i++){
           console.log("\n\n\n\n");
        console.log("------Name of the Venue-----");
        console.log("      "+response.data[i].venue.name);
        console.log("-------------------------");
        console.log("----------City-------------");
        console.log("      "+ response.data[i].venue.city);
        console.log("------------------------------");
        console.log("----------Country------------");
        console.log("         "+ response.data[i].venue.country);
        console.log("-------------------------");
        console.log("-----Date of the Event----");
        var temp = response.data[i].datetime;
        temp = moment().format("MM/DD/YYYY")
        console.log("        "+temp);
        console.log("-------------------------");
        
       }    
    
}).catch(function(error){
    if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
       
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}







switch(mainInput){

    case "concert-this":
        findConcert()
        break;

    case "movie-this":
       displayMovie();
        break; 
        
}