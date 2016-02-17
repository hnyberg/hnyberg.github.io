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
var apparchValue;

var mData;
var pData;
var aData;

var bestMovieURL;
var allMoviesURL;
var productURL;
var appURL;

var productAPIKey;
var appAPIKey;

var downloads;
var screenshots;
var video;

$(document).ready(function(){

	// Set search-button for movies and series
	$("#movieSearchButton").click(function(event){
		event.preventDefault();

		//  Loading screen
		$(".movieResultClass").empty().append("<br><img class ='load' src='load.gif'>");
		setTimeout(function(){

			// Get inputs
			movieSearchValue = $("#movieSearchBox").val();
			
			// Set up best-movie request URLs
			bestMovieURL = "http://www.omdbapi.com/?t=" 
			+ movieSearchValue 
			+ "&tomatoes=true&y=&plot=short&r=json";

			// Set up all-movies request URLs
			allMoviesURL = "http://www.omdbapi.com/?s=" 
			+ movieSearchValue 
			+ "&tomatoes=true&y=&plot=short&r=json";

			// Get best movie/series result (OMDB)
			$.getJSON(bestMovieURL, function(mData){
				$("#bestMovieResults").empty().append("<h2>Best movie result:</h2>");
				
				// Add results
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
						+ "<h3><a href='http://www.imdb.com/title/" + mData.imdbID + "'>" + mData.Title + "</a> (" + mData.Year + ")</h3>"
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
				$("#allMoviesResults").empty().append("<h2>All movie results:</h2>");
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
							+ "<h3><a href='http://www.imdb.com/title/" + o.imdbID + "'>" + o.Title + "</a> (" + o.Type + ", " + o.Year + ")</h3>"
							// End article
							+ "</article>");
					});
				}
			});
		}, 500);
	});

	// Set search-button for eBay products
	$("#productSearchButton").click(function(event){
		event.preventDefault();
		//  Loading screen
		$("#productResults").empty().append("<br><img class ='load' src='load.gif'>");
		setTimeout(function(){

			// Get inputs
			productSearchValue = $("#productSearchBox").val();
			productAPIKey = $("#productAPIBox").val();

			// Set up request URL
			productURL = "http://svcs.ebay.com/services/search/FindingService/v1"
			+ "?OPERATION-NAME=findItemsByKeywords"
		    + "&SERVICE-VERSION=1.0.0"
		    + "&SECURITY-APPNAME=" + productAPIKey
		    + "&GLOBAL-ID=EBAY-US"
		    + "&RESPONSE-DATA-FORMAT=JSON"
		    + "&REST-PAYLOAD"
		    + "&keywords=" + productSearchValue
		    + "&paginationInput.entriesPerPage=10";
			
			// Send request
			$.ajax({
				url: productURL,
				crossDomain: true,
				dataType: "jsonp",
				error: function(jqxhr, error, exc){
					$("#productResults").empty();
					$("#productResults").append("<h3>Error loading product data</h3>");
				},
				method: "GET"
			}).done(function(pData){

				// Callback
				console.log(productURL);
				$("#productResults").empty().append("<h2>Product results:</h2>");
				if (pData.findItemsByKeywordsResponse[0].searchResult[0].item){
					$.each(pData.findItemsByKeywordsResponse[0].searchResult[0].item, function(i, o){

						// Add results
						$("#productResults").append(
							// Start article
							"<article class='item'>"
							// Title
							+ "<h3><a href='" + o.viewItemURL + "'>" + o.title + "</a></h3>"
							// Category
							+ "<p>Category: <a href='http://www.ebay.com/sch/" + o.primaryCategory[0].categoryId[0] + "/i.html'>" + o.primaryCategory[0].categoryName[0] + "</a></p>"
							// Price
							+ "<p><strong>" + o.sellingStatus[0].currentPrice[0].__value__ + " " + o.sellingStatus[0].currentPrice[0]["@currencyId"] + "</strong></p>"
							// Picture
							+ "<img src='" + o.galleryURL + "'>"
							// End article
							+ "</article>");
					});
				}
				else {
					$("#productResults").append("<h3>No search results</h3>");
				}
			});

		}, 500);
	});

	// Set search-button for apps
	$("#appSearchButton").click(function(event){
		event.preventDefault();

		//  Loading screen
		$("#appResults").empty().append("<br><img class ='load' src='load.gif'>");
		setTimeout(function(){

			// Get inputs
			appSearchValue = $("#appSearchBox").val();
			appAPIKey = $("#appAPIBox").val();

			// Set up request URL
			appURL = "https://42matters.com/api/1/apps/search.json?"
			+ "q=" + appSearchValue
			+ "&limit=10"
			+ "&access_token=" + appAPIKey;

			// Send request
			$.getJSON(appURL, function(aData){
				$("#appResults").empty().append("<h2>App results:</h2>");
				$.each(aData.results, function(i, o){

					// Correct prize
					if (o.price === ""){
						o.price = "Free";
					}

					// Reset temporary variables
					screenshots = "";
					video = "";
					downloads = "";

					// Assemble screenshot string
					$.each(o.screenshots, function(k, s){
						screenshots += "<a href='" + s + "'>img" + k + "</a> - ";
					})

					// Correct video link
					if (o.promo_video === ""){
						video = "";
					}
					else {
						video = "<p><strong><a href='" + o.promo_video + "'>Video</a></strong></p>";
					}
					// Set number-of-downloads string
					if (o.downloads_min){
						if ((o.downloads_min/1000000) >= 1){
							o.downloads_min = "" + (o.downloads_min/1000000) + " M";
						}
						downloads = "> " + o.downloads_min;
					}
					else if (o.downloads_max){
						if ((o.downloads_max/1000000) >= 1){
							o.downloads_max = "" + (o.downloads_max/1000000) + " M";
						}
						downloads = "< " + o.downloads_max;
					}
					else {
						downloads = o.downloads;
					}

					// Add results
					$("#appResults").append(
						// Start article
						"<article class='item'>"
						// Picture
						+ "<img src='" + o.icon_72 + "'>"
						// Title
						+ "<h3><a href='" + o.deep_link + "'>" + o.title + "</a></h3>"
						// Category
						+ "<p><strong>Category:</strong> " + o.category + "</p>"
						// Developer
						+ "<p><strong>Developer:</strong> <a href='" + o.website + "'>" + o.developer + "</a></p>"
						// Price
						+ "<p><strong>Price:</strong> " + o.price + "</p>"
						// Rating
						+ "<p><strong>Rating:</strong> " + (Math.round(o.rating*10)/10) + "</p>"
						// Downloads
						+ "<p><strong>Downloads:</strong> " + downloads + "</p>"
						// Screenshots
						+ "<p><strong>Screenshots:</strong> " + screenshots + "<strong></p>"
						// Video
						+ video 
						// End article
						+ "</article>");
				});
			});

		}, 500);
	});
});