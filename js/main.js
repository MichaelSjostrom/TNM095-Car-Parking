var tileSize = 24;
var body = document.getElementsByTagName("BODY")[0];
var window = window;
var canvases = [];
var bgRenderer;

var parkingLot = new ParkingLot();

function run(){
	// build layers
  var width = parkingLot.getMap.length;
  var height = parkingLot.getMap[0].length;
	for (var i = 0, len = 2; i < len; i++) {
		var canvas = '<canvas width="'+(width * tileSize)+'" height="'+(height * tileSize)+'" data-index="'+i+'" class="gamecanvas canvas'+ i +'"/>';
		body.innerHTML += canvas;
		canvases.push(canvas);
	}

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  var mapRenderer = new MapRenderer(mapCanvas, parkingLot.getMap);
  mapRenderer.draw();

  mapCanvas.addEventListener('mousemove', function(evt){
    var mousePos = getMousePos(canvas, evt);
    writeMessage(mousePos);
  }, false);

}
run();

function getMousePos(canvas, evt) {
  var posX = evt.clientX - 7;
  var posY = evt.clientY - 7;

  return {
    x: Math.floor(posX/tileSize),
    y: Math.floor(posY/tileSize)
  };
}

function writeMessage(mousePos) {
  var tile = parkingLot.getMap[mousePos.x][mousePos.y];
  console.log(tile.getIndex);
}
