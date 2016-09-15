
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

		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = "rgba(255,0,0,0.6)";

		this.map.forEach(function(row,i){
			row.forEach(function(tile,j){
				if(tile !== 0 ){
					self.drawTile(i, j);
				}
			});
		});
	}

	drawTile(x,y){
		this.context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	}

}
