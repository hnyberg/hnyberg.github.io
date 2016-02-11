// 
//	Created by Hannes Nyberg
//	hannes.nyberg@gmail.com
//	https://github.com/hnyberg
// 
//	API used:
// 	http://www.omdbapi.com/?
// 
var searchValue;
var data;

$(document).ready(function(){
	$("#searchButton").click(function(event){
		event.preventDefault();
		if ($("#searchBox").val() !== ""){

			//  Loading screen
			searchValue = $("#searchBox").val();
			$(".resultClass").empty().append("<img src='load.gif'>");
			setTimeout(function(){

				// Send REQUESTS, get DATA

				// Get best movie/series result (OMDB)
				$.getJSON("http://www.omdbapi.com/?t=" + searchValue + "&tomatoes=true&y=&plot=short&r=json", function(data){
					$("#bestMovieSection").empty();
					if (data.Response === "False"){
						$("#bestMovieSection").append("<h3>" 
							+ data.Error
							+ "</h3>")
					}
					else {
						$("#bestMovieSection").append(
							// Start article
							"<article class='item'>"
							// Title and year
							+ "<a href='http://www.imdb.com/title/" + data.imdbID + "'><h3>" + data.Title + "</a> (" + data.Year + ")</h3>"
							// Genre
							+ "<p><strong>Genre:</strong> " + data.Genre + "</p>"
							// About
							+ "<p>" + data.Plot + "</p><p>" + data.tomatoConsensus + "</p>"
							// Writers
							+ "<p><strong>Writers:</strong> " + data.Writer + "</p>"
							// Actors
							+ "<p><strong>Actors:</strong> " + data.Actors + "</p>"
							// Rating table
							+ "<table><tr><td><strong>IMDB:</strong></td><td>" + data.imdbRating + "</td></tr>"
							+ "<tr><td><strong>Rotten (critics):</strong></td><td>" + data.tomatoMeter + " %</td></tr>"
							+ "<tr><td><strong>Rotten (users):</strong></td><td>" + data.tomatoUserMeter + " %</td></tr>"
							+ "<tr><td><strong>Metascore:</strong></td><td>" + data.Metascore + " %</td></tr></table>"
							// Origin and language
							+ "<p><strong>Language (origin):</strong> " + data.Language + " (" + data.Country + ")</p>"
							// End article
							+ "</article>");
					}
				});

				// Get other movie/series results (OMDB)
				$.getJSON("http://www.omdbapi.com/?s=" + searchValue + "&tomatoes=true&y=&plot=short&r=json", function(data){
					$("#allMoviesSection").empty();
					if (data.Response === "False"){
						$("#allMoviesSection").append("<h3>" 
							+ data.Error
							+ "</h3>")
					}
					else {
						$.each(data.Search, function(i, o){
							$("#allMoviesSection").append(
								// Start article
								"<article class='item'>"
								// Title and year
								+ "<a href='http://www.imdb.com/title/" + o.imdbID + "'><h3>" + o.Title + "</a> (" + o.Type + ", " + o.Year + ")</h3>"
								// End article
								+ "</article>");
						});
					}
				});

				$("#productSection").empty();
			}, 500);
		}
	});
});