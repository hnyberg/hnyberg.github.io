//
// 	Created by Hannes Nyberg
// 	hannes.nyberg@gmail.com
// 	https://github.com/hnyberg
//

// 	Prepare variables
var trees = [];
var idCount = 0;
var currentID = 0;
var treeText = "";

$(document).ready(
	function(){

		// 	Set button to plant trees
		$('#plantButton').click(
			function(event){

				//	What happens at click?
				event.preventDefault();
				if ($('input').val() !== ""){

					//	Store tree as object
					idCount++;
					treeText = $('input').val();
					trees.push(
						{
							name: idCount,
							content: treeText,
							size: treeText.length
						}
					);
					updateDisplays();

					//	Create and plant tree in forest-list
					var treeButton = "<li class='tree' id='"
					+ idCount + "'>" + treeText + "</li>";
					$('#forest').append(treeButton);

					//	Change tree color
					var clr = 20 + Math.floor(Math.random()*50);
					var treeColor = "#" + clr + (clr+20) + clr;
					$('.tree').last().css("background-color", treeColor);

					//	Set click event handler on tree
					$('.tree').last().on(
						"click", function(){
							currentID = this.id;
							$(this).css("background-color", "#DD9933");
							$(this).addClass("burn");
							$(this).fadeOut(
								1000,function(){
									$(this).remove();
								}
							);
							// Remove tree object
							for (i in trees){
								if (trees[i].name == currentID){
									trees.splice(i, 1);
									break;
								}
							};
							updateDisplays();
						}
					);
				}
			}
		);

		//	Set button to burn forest
		$('#burnButton').click(
			function(event){
				event.preventDefault();
				$('.tree').css("background-color", "#DD9933");
				$('.tree').addClass("burn");
				$('.tree').fadeOut(
					500,function(){
						$(this).remove();
					}
				);

				//	Clear all tree objects
				trees.length = 0;
				updateDisplays();
			}
		);
    }
);

function updateDisplays(){

	// 	Update number of characters
	var numCharacters = 0;
	for (i in trees){
		numCharacters += trees[i].size;
	}
	$('#charDisplay').text("Characters in forest: " + numCharacters);
	
	// Update number of trees
	$('#treeDisplay').text("Trees in forest: " + trees.length);
}
