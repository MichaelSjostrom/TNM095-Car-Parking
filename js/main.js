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
    newCar = new Car(carCanvas, 'red');
    newCar.renderCar(0, 0);
    state.addCar(newCar);
    var tile = parkingLot.getTile(0, 22);
    var path = state.updateCar(newCar, tile, false);
    newCar.startAnimation(path, state.getCars, callback);
  } else {
    console.log('maximum of two cars allowed');
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

	car = new Car(carCanvas, 'blue', 'down');

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  mapRenderer = new MapRenderer(mapCanvas, parkingLot.getMap);
  mapRenderer.draw();

  state = new State(parkingLot);
  state.addCar(car);

  var path = [];
  var tempX = car.getX;
  var tempY = car.getY;

  while(!car.isParked){

    var tempTile = getDirection(car);
    var temp = state.updateCar(car, tempTile, true);

    // Updating car position after calculations have been made.
    car.xPos = tempTile.getX*24;
    car.yPos = tempTile.getY*24;

    for(var i = 0; i < temp.length; i++){
      path.push(temp[i]);
    }
  }
  car.xPos = tempX;
  car.yPos = tempY;

  car.startAnimation(path, state.getCars, callback);
}
run();

function callback() {
  console.log('car is done moving');
}

function getDirection(car) {

  var carPos = {};
  carPos.x = Math.floor(car.getX / 24);
  carPos.y = Math.floor(car.getY / 24);

  var startTile = parkingLot.getTile(carPos.x, carPos.y);

  var newTile = null;

  if(car.prevStep && car.prevStep == 'down'){
    if(startTile.getIndex > 455) {
      newTile = parkingLot.getTile(0, carPos.y);
      car.prevStep = 'left';
    } else {
      newTile = parkingLot.getTile(19, carPos.y);
      car.prevStep = 'right';
    }
  } else {
     newTile = parkingLot.getTile(carPos.x, carPos.y + 2);
     car.prevStep = 'down';
  }

  return newTile;
}

//Listens when the mouse is moved over the canvas
carCanvas.addEventListener('mousemove', function(evt){
  mousePos = mouse.getMousePos(carCanvas, evt);
  var tile = parkingLot.getTile(mousePos.x, mousePos.y);
}, false);

//Listens when a click occurs, used to to switch between free and taken parking spaces
carCanvas.addEventListener('click', function(){
  var tile = parkingLot.getTile(mousePos.x, mousePos.y);
  console.log(mousePos.x + " " + mousePos.y);
  if(tile.getType == 'parking'){
    if(tile.isTaken == true){
        tile.setTaken(false);
    } else {
      tile.setTaken(true);
    }
    mapRenderer.update(tile);
    if (!tile.isTaken)
      state.updateCar(car, tile);
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
