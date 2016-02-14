// 
//	Created by Hannes Nyberg
//	hannes.nyberg@gmail.com
//	https://github.com/hnyberg
// 
//	API used:
// 	http://www.omdbapi.com/?
// 
var movieSearchValue;
var productSearchValue;
var mData;
var eData;
var bestMovieURL;
var allMoviesURL;
var eBayURL;
var APIKey;

$(document).ready(function(){

	// Set search-button for movies
	$("#movieSearchButton").click(function(event){
		event.preventDefault();
		if ($("#movieSearchBox").val() !== ""){

			//  Loading screen
			$(".movieResultClass").empty().append("<img src='load.gif'>");
			setTimeout(function(){

				// Get inputs
				movieSearchValue = $("#movieSearchBox").val();
				
				// Set movie search URLs
				bestMovieURL = "http://www.omdbapi.com/?t=" 
				+ movieSearchValue 
				+ "&tomatoes=true&y=&plot=short&r=json";
				allMoviesURL = "http://www.omdbapi.com/?s=" 
				+ movieSearchValue 
				+ "&tomatoes=true&y=&plot=short&r=json";

				// Get best movie/series result (OMDB)
				$.getJSON(bestMovieURL, function(mData){
					$("#bestMovieResults").empty();
					if (mData.Response === "False"){
						$("#bestMovieResults").append("<h3>" 
							+ mData.Error
							+ "</h3>");
					}
					else {
						$("#bestMovieResults").append(
							// Start article
							"<article class='item'>"
							// Title and year
							+ "<a href='http://www.imdb.com/title/" + mData.imdbID + "'><h3>" + mData.Title + "</a> (" + mData.Year + ")</h3>"
							// Genre
							+ "<p><strong>Genre:</strong> " + mData.Genre + "</p>"
							// About
							+ "<p>" + mData.Plot + "</p><p>" + mData.tomatoConsensus + "</p>"
							// Writers
							+ "<p><strong>Writers:</strong> " + mData.Writer + "</p>"
							// Actors
							+ "<p><strong>Actors:</strong> " + mData.Actors + "</p>"
							// Rating table
							+ "<table id='ratingTable'><tr><td><strong>IMDB:</strong></td><td>" + mData.imdbRating + "</td></tr>"
							+ "<tr><td><strong>Rotten (critics):</strong></td><td>" + mData.tomatoMeter + " %</td></tr>"
							+ "<tr><td><strong>Rotten (users):</strong></td><td>" + mData.tomatoUserMeter + " %</td></tr>"
							+ "<tr><td><strong>Metascore:</strong></td><td>" + mData.Metascore + " %</td></tr></table>"
							// Origin and language
							+ "<p><strong>Language (origin):</strong> " + mData.Language + " (" + mData.Country + ")</p>"
							// End article
							+ "</article>");
					}
				});

				// Get other movie/series results (OMDB)
				$.getJSON(allMoviesURL, function(mData){
					$("#allMoviesResults").empty();
					if (mData.Response === "False"){
						$("#allMoviesResults").append("<h3>" 
							+ mData.Error
							+ "</h3>");
					}
					else {
						$.each(mData.Search, function(i, o){
							$("#allMoviesResults").append(
								// Start article
								"<article class='item'>"
								// Title and year
								+ "<a href='http://www.imdb.com/title/" + o.imdbID + "'><h3>" + o.Title + "</a> (" + o.Type + ", " + o.Year + ")</h3>"
								// End article
								+ "</article>");
						});
					}
				});
			}, 500);
		}
	});

	// Set search-button for eBay products
	$("#productSearchButton").click(function(event){
		event.preventDefault();
		if ($("#productSearchBox").val() !== ""
			&& $("#APIBox").val() !== ""){

			//  Loading screen
			$("#productResults").empty().append("<img src='load.gif'>");
			setTimeout(function(){

				// Get inputs
				productSearchValue = $("#productSearchBox").val();
				APIKey = $("#APIBox").val();
				APIKey = "Private(-MovieSea-PRD-ad32f3572-693de996";

				// Set URL
				eBayURL = "http://svcs.ebay.com/services/search/FindingService/v1"
				+ "?OPERATION-NAME=findItemsByKeywords"
			    + "&SERVICE-VERSION=1.0.0"
			    + "&SECURITY-APPNAME=" + APIKey
			    + "&GLOBAL-ID=EBAY-US"
			    + "&RESPONSE-DATA-FORMAT=JSON"
			    + "&jsoncallback=?"
			    + "&REST-PAYLOAD"
			    + "&keywords=" + productSearchValue
			    + "&paginationInput.entriesPerPage=10";

			    eBayURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Private(-MovieSea-PRD-ad32f3572-693de996&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&jsoncallback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=rrtyrtyrtyrtyrty&paginationInput.entriesPerPage=10";

				// Get best product result (eBay US)
				$.getJSON(eBayURL, _cb_findItemsByKeywords());
			}, 500);
		}
	});
});

function _cb_findItemsByKeywords(root){
	$("#productSection").empty();
	eData = eData.findItemsByKeywordsResponse[0];
	if (!eData.searchResult[0].hasOwnProperty("item")){
		$("#productResults").append("<a href="
			+ eData.itemSearchURL
			+ "><h3>No Results</h3></a>");
	}
}