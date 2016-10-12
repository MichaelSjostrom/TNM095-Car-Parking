
class MapRenderer{

	constructor(canvas, map){

		this.width = canvas.getAttribute('width');
		this.height = canvas.getAttribute('height');
		this.map = map;
		this.context = canvas.getContext('2d');
		this.tileSize = 24;

		this.colorTaken = "rgba(255,0,0,0.6)";
		this.colorOpen = "rgba(0,255,0,0.6)";
		this.colorDriveWay = "rgba(155,155,155,0.6)";

	};

	//Draws the map
	draw(){
		var self = this;

		this.context.clearRect(0, 0, this.width, this.height);

		this.map.forEach(function(row,i){
			row.forEach(function(tile,j){
				if(tile.getType == 'road' ){
					self.context.fillStyle = self.colorDriveWay;
				}
				else if(tile.getType == 'parking'){
					if(tile.isTaken == true){
						self.context.fillStyle = self.colorTaken;
					}
					else if(tile.isTaken == false){
						self.context.fillStyle = self.colorOpen;
					}
						self.drawParkingLines(i, j);
				}
				self.drawTile(i, j);
				self.context.fillText(tile.getIndex, i*self.tileSize + 3 , j*self.tileSize + 12);

			});
		});

	}

	//Draws the tile
	drawTile(x,y){
		this.context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	}

	//Draws a stroke in the beginning of each parking place.
	drawParkingLines(x, y){
		this.context.beginPath();
		this.context.moveTo(x * this.tileSize , y * this.tileSize + this.tileSize);
		this.context.lineTo(x * this.tileSize, y * this.tileSize);
		this.context.stroke();

		var lastParkingSpace = this.map.length - 3;

		// Draws strokes for the last column of parking spaces.
		if(x > lastParkingSpace) {
			this.context.beginPath();
			this.context.moveTo(x * this.tileSize + this.tileSize, y * this.tileSize + this.tileSize);
			this.context.lineTo(x * this.tileSize + this.tileSize, y * this.tileSize);
			this.context.stroke();
		}
	}


	//Updates the specified tile
	update(tile){
		if(tile.getType == 'parking'){
			this.context.clearRect(tile.getX * this.tileSize, tile.getY * this.tileSize, this.tileSize, this.tileSize);
			if(tile.isTaken == true){
				this.context.fillStyle = this.colorTaken;
				this.drawTile(tile.getX, tile.getY);
			} else {
				this.context.fillStyle = this.colorOpen;
				this.drawTile(tile.getX, tile.getY);
			}
			this.context.fillText(tile.getIndex, tile.getX*self.tileSize + 3 , tile.getY*self.tileSize + 12);
		}

	}

}
