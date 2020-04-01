// pull our api_id from dotenv that we saved
require("dotenv").config();

// getting our keys

var keys = require("./keys.js");

const fse = require('fs-extra')

// creating the packages // 

var axios = require("axios");

var moment = require("moment");

var Spotify = require("node-spotify-api");


//creating the object from the api
// spotify node api
var spotify = new Spotify(keys.spotify);
console.log(spotify);


// this is for OMDB AXIOS FOR MOVIE INPUT for node liri.js movie-this

// global variables
var mainInput = process.argv[2];

var input = process.argv;
console.log(input);
var universalurl ="";




// this is for multiple words movies to add to the url that we gonna need

if (input[3] == null ){
    universalurl += "Mr.Nobody";
} else{
for (var i = 3;i<input.length;i++){
    
     if (i > 3 && i < input.length) {
        universalurl = universalurl + "+" + input[i];
        
      } 
    else {
        universalurl += input[i];
      } 
    }
}

var findSpotify = function(){
    if (universalurl.length === 9){
        spotify
        .search({ type: 'track', query:"The Sign",limit:1 })
        .then(function(response) {
            console.log("Artist");
            console.log("--------------------");
            console.log(response.tracks.items[0].artists[0].name);
            console.log("-------Song's Name----------");
            console.log("|||| "+response.tracks.items[0].name+" |||||");
            console.log("-------------------------------");
            console.log("-------Preview Link from spotify to listen---\n");
            console.log(response.tracks.items[0].preview_url);
            console.log("--------------------------------------------------------------------------");
            console.log("-------The Album That the Song is from --------");
            console.log("|  |   | "+ response.tracks.items[0].album.name+"  |  |  |");
            console.log("------------------------------------")
    });
    }else{
    spotify
      .search({ type: 'track', query:universalurl,limit:5 })
      .then(function(response) {
        for(var i=0; i<response.tracks.items.length; i++){
            
            console.log("\n\n\n\n");
            console.log("Artists");
            console.log("--------------------");
            console.log("|||| "+response.tracks.items[i].artists[0].name+" ||||");
            console.log("---------------------------------");
            console.log("-------Song's Name----------");
            console.log("|||| "+response.tracks.items[i].name+" |||||");
            console.log("-------------------------------");
            console.log("-------Preview Link from spotify to listen---\n");
            console.log(response.tracks.items[i].preview_url);
            console.log("--------------------------------------------------------------------------");
            console.log("-------The Album That the Song is from --------");
            console.log("|  |   | "+ response.tracks.items[i].album.name+"  |  |  |");
            console.log("------------------------------------")
        }
            
      })
      .catch(function(err) {
        console.log(err);
      });
    }
}
    

// creating queryUrl for axios
var queryUrl = "http://www.omdbapi.com/?t=" + universalurl + "&y=&plot=short&apikey=trilogy";

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
  
/// creating bandsUrl for Bands In Town
/// bands in town app that triggers upon concert-this

var findConcert = function(){


var bandsUrl = "https://rest.bandsintown.com/artists/" + universalurl +"/events?app_id=codingbootcamp";
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
        var temp = moment(response.data[i].datetime);
        temp =  temp.format("MM/DD/YYYY")
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





// creating switch state for userinput

switch(mainInput){

    case "concert-this":
        findConcert();
        break;

    case "spotify-this-song":
        findSpotify();
        break;

    case "movie-this":
       displayMovie();
        break; 

    case "do-what-it-says":

        
}