var cards_array = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12'];
		var tiles_flipped = 0;
		var cards_values = [];
		var cards_tile_ids=[];
		var counter; 
		var score = 0;
		var best = 0;
		var game = 0;

		
		Array.prototype.cards_tile_shuffle = function() {

			var i = this.length, j, temp;
			while( i-- > 0) {

				j = Math.floor(Math.random() * (i+1));
				temp = this[j];
				this[j] = this[i];
				this[i] = temp;
			}
		}	

		function newBoard() {

			counter = 55;
			score = 0;
			tiles_flipped = 0;
			game = game + 1;
			var ans = '';
			cards_array.cards_tile_shuffle();
			document.getElementById('game').innerHTML = game;
			document.getElementById('moves').innerHTML = counter;
			document.getElementById('pos').innerHTML = score;
			for ( var i = 0; i < cards_array.length; ++i) {

				ans = ans + '<div id="tile_'+i+'"onclick="fliptile(this,\''+cards_array[i]+'\')"></div>';
			}
			document.getElementById('board').innerHTML = ans;
		}

		function fliptile(tile,val) {

			counter--;
			document.getElementById('moves').innerHTML = counter;
			if(counter < 0){

				alert("You're out of moves! Click to play again!");
				document.getElementById('board').innerHTML = "";
				newBoard();
			}

			if(tile.innerHTML == "" && cards_values.length < 2) {

				if(val == '1' || val == '7'){

					tile.style.background = '#b2cb05';
				}
				else if (val == '2' || val == '8'){

					tile.style.background = '#f3c403';
				}
				else if (val == '3' || val == '9'){

					tile.style.background = '#b2cb05';
				}
				else if (val == '4' || val == '10'){

					tile.style.background = '#f38408';
				}
				else if (val == '5' || val == '11'){

					tile.style.background = '#f38408';
				}
				else if (val == '6' || val == '12'){

					tile.style.background = '#f3c403';
				}
				else{

					tile.style.background = '#FFFFFF';
				}
				tile.innerHTML = val;
				if ( cards_values.length == 0 ) {

					cards_values.push(val);
					cards_tile_ids.push(tile.id);
				}
				else if (cards_values.length == 1) {

					cards_values.push(val);
					cards_tile_ids.push(tile.id);
					if(cards_values[0] == cards_values[1]) {

						tiles_flipped = tiles_flipped + 2;

						cards_values = [];
						cards_tile_ids = [];

						score = score + 15;
						document.getElementById('pos').innerHTML = score;

						if(tiles_flipped == cards_array.length) {

							if(score > best){

								best = score;
							}

							alert("Well Done! Click Okay to Play Again");
							document.getElementById('board').innerHTML = "";
							newBoard();
						}
					} 
					else {

						function flipback() {

							var tile_1 = document.getElementById(cards_tile_ids[0]);
							var tile_2 = document.getElementById(cards_tile_ids[1]);
							tile_1.style.background = 'url(../images/cube.png) no-repeat';
							tile_1.innerHTML = "";
							tile_2.style.background = 'url(../images/cube.png) no-repeat';
							tile_2.innerHTML = "";

							cards_values = [];
							cards_tile_ids = [];

							score = score - 5;
							document.getElementById('pos').innerHTML = score;
						}
						setTimeout(flipback,500);
					}
				}
			}
		}