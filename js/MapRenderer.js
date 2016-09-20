
class MapRenderer{
	constructor(canvas, map){

		this.width = canvas.getAttribute('width');
		this.height = canvas.getAttribute('height');
		this.map = map;
		this.context = canvas.getContext('2d');
		this.tileSize = 24;

	};

	draw(){
		var self = this;
		this.colorTaken = "rgba(255,0,0,0.6)";
		this.colorOpen = "rgba(0,255,0,0.6)";
		this.colorDriveWay = "rgba(155,155,155,0.6)";

		this.context.clearRect(0, 0, this.width, this.height);


		this.map.forEach(function(row,i){
			row.forEach(function(tile,j){
				if(tile.getType == 'road' ){
					self.context.fillStyle = self.colorDriveWay;
					self.drawTile(i, j);
				}
				else if(tile.getType == 'parking'){
					if(tile.isTaken == true){
						self.context.fillStyle = self.colorTaken;
						self.drawTile(i,j);

					}
					else if(tile.isTaken == false){
						self.context.fillStyle = self.colorOpen;
						self.drawTile(i,j);
					}
				}

				self.context.fillText(tile.getIndex, i*self.tileSize + 3 , j*self.tileSize + 12);

			});
		});
	}

	drawTile(x,y){
		this.context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);

		this.context.beginPath();
		this.context.moveTo(x * this.tileSize, y);
		this.context.lineTo(x * this.tileSize, y * this.tileSize);
		this.context.stroke();

		this.context.beginPath();
		this.context.moveTo(x , y * this.tileSize);
		this.context.lineTo(x * this.tileSize, y * this.tileSize);
		this.context.stroke();

	}

}
