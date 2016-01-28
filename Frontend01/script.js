//
// 	Created by Hannes Nyberg
// 	hannes.nyberg@gmail.com
// 	https://github.com/hnyberg
//
$(document).ready(
	function(){
		$('#plantButton').click(
			function(event){
				event.preventDefault();
				if ($('input').val() !== ""){

					// Create tree
					var tree = "<li class='tree'>"
					+ $('input').val()
					+ "</li>";

					// Plant tree
					$('#forest').append(tree);

					// Change tree color
					var clr = 20 + Math.floor(Math.random()*50);
					var treeColor = "#" + clr + (clr+20) + clr;
					$('.tree').last().css("background-color", treeColor);

					// Set click event handler on tree
					$('.tree').last().on(
						"click", function(){
							$(this).css("background-color", "#DD9933");
							$(this).addClass("burn");
							$(this).fadeOut(
								500,function(){
									$(this).remove();
								}
							);
						}
					);
				}
			}
		);
    }
);
