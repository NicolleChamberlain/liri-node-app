//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var spotify = require ("spotify");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");

//initial user command:

var userCommand= process.argv[2];
var userInput= process.argv.slice(process.argv.length).join(" ");

//liri.js can take in one of the following commands:

switch(liriArgument) {
    case "concert-this": concertThis(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;

    default: console.log()
};

//`node liri.js concert-this <artist/band name here>`:

    function concertThis(userInput) {
        var artist = userInput;
        var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        for (var i=0; i < response.data.length; i++){
            console.log("-------------------------------------")
            console.log("Name of Venue: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city);
            console.log("Date: " + moment (response.data[i].date, 'MM/DD/YYYY').format("MM/DD/YYYY"));
            console.log("-------------------------------------");
        }
    }





// This will show the following information about the song in your terminal/bash window:
	function spotifyThisSong(songName) {
		var songName = process.argv[3];
		if(!songName){
			songName = "'The Sign' by Ace of Base";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + i;

						console.log(spotifyResults);
						log(spotifyResults); 
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
    };
    

//`node liri.js movie-this '<movie name here>'`:

function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "mr nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            var movieResults =
            "------------------------------------------------------------" + "\r\n"
            "Title: " + movieObject.Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n"+
            "------------------------------------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults); 
        } else {
            console.log("Error :"+ error);
            return;
        }
    });
};



// `node liri.js do-what-it-says`

    function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatItSaysResults = data.split(",");
				spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});
	};
	
	function log(logResults) {
	  fs.appendFile("random.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}

















    