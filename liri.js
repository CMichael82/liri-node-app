require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv.slice(3).join(" ");
var request = require("request");
var moment = require("moment");
var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=de79b866";

switch (action) {
	case "concert-this":
	concertThis();
	break;
	
	case "movie-this":
	movieThis();
	break;
}

function concertThis() {
	request(bandsUrl, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var venueInfo = JSON.parse(body);
			for (i = 0; i < venueInfo.length; i++) {
				console.log("Name of Venue: " + venueInfo[i].venue.name);
				console.log("Venue Location: " + venueInfo[i].venue.city + " " + venueInfo[i].venue.region + " " + venueInfo[i].venue.country);
				console.log("Date of event: " + moment(venueInfo[i].datetime).format("MM/DD/YYYY"));
			}
		}
	});
}

function movieThis() {
	request(movieUrl, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var movieInfo = JSON.parse(body);
			console.log("Movie Title: " + movieInfo.Title);
			console.log("Release Year: " + movieInfo.Year);
			console.log("IMDB Rating: " + movieInfo.imdbRating);
			console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
			console.log("Language: " + movieInfo.Language);
			console.log("Plot: " + movieInfo.Plot);
			console.log("Actors: " + movieInfo.Actors);
		}
	});
}