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
var state;
var mousePos;
var mapRenderer;
var astar;

var car, newCar, carCanvas;

function addCar() {
  var cars = state.getCars;
  if (cars.length < 2){
    newCar = new Car(carCanvas);
    newCar.renderCar(0, 0);
    state.addCar(newCar);
  } else {
    console.log('add car did not work');
  }
}

function removeCar() {
  var cars = state.getCars;
  if (cars.length > 1) {
    state.removeCar();
  }
}

function run() {
	// build layers
  var width = parkingLot.getMap.length;
  var height = parkingLot.getMap[0].length;
  for (var i = 0, len = 2; i < len; i++) {
    var canvas = '<canvas width="'+(width * tileSize)+'" height="'+(height * tileSize)+'" z-index="'+i+'" class="gamecanvas canvas'+ i +'" style="position: absolute;"/>';
    canvasContainer.innerHTML += canvas;
    canvases.push(canvas);
  }
	carCanvas = document.getElementsByTagName('canvas')[1];

	car = new Car(carCanvas);

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  mapRenderer = new MapRenderer(mapCanvas, parkingLot.getMap);
  mapRenderer.draw();

  state = new State(parkingLot);
  state.addCar(car);
}
run();

//Listens when the mouse is moved over the canvas
carCanvas.addEventListener('mousemove', function(evt){
  mousePos = mouse.getMousePos(carCanvas, evt);
  var tile = parkingLot.getTile(mousePos.x, mousePos.y);
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

    state.updateCar(tile);
  }
});


window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  // Moving the car
  // Should be done in a separate function where the AI controls this instead of keypresses
  switch (key) {
    // Negative x
    case 37:
      car.startAnimation([{axis:'X', dir:-1}]);
      break;
    // Negative y
    case 38:
      car.startAnimation([{axis:'Y', dir:-1}]);
      break;
    // Positive x
    case 39:
      car.startAnimation([{axis:'X', dir:1}]);
      break;
    // Positive y
    case 40:
      car.startAnimation([{axis:'Y', dir:1}]);
      break;
    default:
      return;
  }
}
