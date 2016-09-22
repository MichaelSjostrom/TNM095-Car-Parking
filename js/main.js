window.requestAnimFrame = (function(callBack) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
})();

var tileSize = 24;
var body = document.getElementsByTagName('body')[0];
var canvasContainer = document.getElementsByClassName('container')[0]
var canvases = [];
var bgRenderer;

var parkingLot = new ParkingLot();
var mouse = new Mouse();
var mousePos;
var mapRenderer;
var astar;

var car;

var followMouse = true;

function run() {
	// build layers
  var width = parkingLot.getMap.length;
  var height = parkingLot.getMap[0].length;
  for (var i = 0, len = 2; i < len; i++) {
    var canvas = '<canvas width="'+(width * tileSize)+'" height="'+(height * tileSize)+'" z-index="'+i+'" class="gamecanvas canvas'+ i +'" style="position: absolute;"/>';
    canvasContainer.innerHTML += canvas;
    canvases.push(canvas);
  }
	var carCanvas = document.getElementsByTagName('canvas')[1];

	car = new Car(carCanvas);

  car.renderCar(0, 0);

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  mapRenderer = new MapRenderer(mapCanvas, parkingLot.getMap);
  mapRenderer.draw();

  //Listens when the mouse is moved over the canvas
  carCanvas.addEventListener('mousemove', function(evt){
    mousePos = mouse.getMousePos(canvas, evt);
    var tile = parkingLot.getTile(mousePos.x, mousePos.y);

    /*if(followMouse == true){
      astar.search(startPos, tile);
    }*/
  }, false);

  //Listens when a click occurs, used to to switch between free and taken parking spaces
  carCanvas.addEventListener('click', function(){
    var tile = parkingLot.getTile(mousePos.x, mousePos.y);
    if(tile.getType == 'parking'){
      if(tile.isTaken == true){
          tile.setTaken(false);
      } else {
        tile.setTaken(true);
      }
      mapRenderer.update(tile);
    }
    var startPos = {};
    startPos.x = Math.floor(car.getX / tileSize);
    startPos.y = Math.floor(car.getY / tileSize);
    console.log(startPos);

    var startTile = parkingLot.getTile(startPos.x, startPos.y);
    var result = astar.search(startTile, tile);

    result.push(startTile.index);
    result = result.reverse();

    var path = [];

    for (var i = 0; i < result.length - 1; i++) {
      if (result[i + 1] == result[i] + 1) {
        // Down
        path.push({axis:'Y', dir:1});
      }
      else if (i > 0 && result[i] < result[i] - 1) {
        // Up
        path.push({axis:'Y', dir:-1});
      }
      else if (result[i + 1] > result[i] + 1) {
        // Right
        path.push({axis:'X', dir:1});
      }
      else {
        // Left
        path.push({axis:'X', dir:-1});
      }
    }

    car.startAnimation(path);
  });

  astar = new Astar(parkingLot);
}
run();


window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  // Moving the car
  // Should be done in a separate function where the AI controls this instead of keypresses
  switch (key) {
    // Negative x
    case 37:
      car.moveX(-1);
      break;
    // Negative y
    case 38:
      car.moveY(-1);
      break;
    // Positive x
    case 39:
      car.moveX(1);
      break;
    // Positive y
    case 40:
      car.moveY(1);
      break;
    default:
      return;
  }
}
