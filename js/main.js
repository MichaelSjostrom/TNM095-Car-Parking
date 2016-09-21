var tileSize = 24;
var body = document.getElementsByTagName("BODY")[0];
var window = window;
var canvases = [];
var bgRenderer;

var parkingLot = new ParkingLot();
var mouse = new Mouse();
var mousePos;
var mapRenderer;

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
  mapRenderer = new MapRenderer(mapCanvas, parkingLot.getMap);
  mapRenderer.draw();

  //Listens when the mouse is moved over the canvas
  mapCanvas.addEventListener('mousemove', function(evt){
    mousePos = mouse.getMousePos(canvas, evt);
    var tile = parkingLot.getTile(mousePos.x, mousePos.y);

    console.log(tile.getIndex);

  }, false);

  //Listens when a click occurs, used to to switch between free and taken parking spaces
  mapCanvas.addEventListener('click', function(){
    var tile = parkingLot.getTile(mousePos.x, mousePos.y);

    if(tile.getType == 'parking'){
      if(tile.isTaken == true){
          tile.setTaken(false);
      } else {
        tile.setTaken(true);
      }
      mapRenderer.update(tile);
    }
  });

}
run();

