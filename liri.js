require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv.slice(3).join(" ");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=de79b866";

switch (action) {
	case "concert-this":
		concertThis();
		break;

	case "spotify-this-song":
		spotifyThisSong(input);
		break;

	case "movie-this":
		movieThis();
		break;

	case "do-what-it-says":
		doWhatItSays();
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

// "The Sign" by Ace of Base as default - DO I NEED A LOOP?
function spotifyThisSong(input) {
	spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var songInfo = data.tracks.items
		for (var i = 0; i < songInfo.length; i++) {
			console.log("Artist(s): " + songInfo[i].album.artists[i].name);
			console.log("Song Name: " + songInfo[i].name);
			console.log("Preview URL: " + songInfo[i].preview_url);
			console.log("Album Name: " + songInfo[i].album.name);
		}
	});
}

//NEED TO ADD MR.NOBODY AS A DEFAULT///
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


function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		var dataArray = data.split(",");
		action = dataArray[0];
		input = dataArray[1];
		console.log(action + " " + input);
		spotifyThisSong(input);
		});
}