require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv[3];
var request = require("request");
var moment = require("moment");

concertThis();

function concertThis() {
	if (action === "concert-this") {
		var bandsURL = "https://rest.bandsintown.com/artists/" + input + "/eventsapp_id=codingbootcamp";
		request(bandsURL, function (error, response, body) {
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
}
