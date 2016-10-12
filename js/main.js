window.requestAnimFrame = (function(callBack) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
})();

window.requestAnimFramePerson = (function(callback) {
  return function(callback) {
        window.setTimeout(callback, 20);
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

var sec = 0, sec2 = 0;

var car, newCar, carCanvas;

function addCar() {
  var cars = state.getCars;
  if (cars.length < 2){
    var newPerson = new Person(personCanvas, 'red');
    newCar = new Car(carCanvas, 'red', 'down', newPerson);
    newCar.isGoing = 'up';
    newCar.renderCar(0, 0);
    state.addCar(newCar);
    state.addPerson(newPerson);
    var tile = parkingLot.getTile(0, 22);
    var path = state.updateCar(newCar, tile, false);

    newCar.startAnimation(path, state.getCars, callback);
    newCar.timer = setInterval(function () {
        document.getElementById("seconds2").innerHTML = pad(++sec2 % 60);
        document.getElementById("minutes2").innerHTML = pad(parseInt(sec2 / 60, 10));
    }, 1000);
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
  for (var i = 0, len = 3; i < len; i++) {
    var canvas = '<canvas width="'+(width * tileSize)+'" height="'+(height * tileSize)+'" z-index="'+i+'" class="gamecanvas canvas'+ i +'" style="position: absolute;"/>';
    canvasContainer.innerHTML += canvas;
    canvases.push(canvas);
  }
	carCanvas = document.getElementsByTagName('canvas')[1];
  personCanvas = document.getElementsByTagName('canvas')[2];

  var person = new Person(personCanvas, 'blue');
	car = new Car(carCanvas, 'blue', 'down', person);
  car.isGoing = 'down';

  car.timer = setInterval(function () {
      document.getElementById("seconds").innerHTML = pad(++sec % 60);
      document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
  }, 1000);

  var mapCanvas = document.getElementsByTagName("canvas")[0];
  mapRenderer = new MapRenderer(mapCanvas, parkingLot.getMap);
  mapRenderer.draw();


  state = new State(parkingLot);
  state.addCar(car);
  state.addPerson(person);

  addCar();

  animateCar(car);
}
run();

function callback(car) {

  //clearInterval(car.timer);

  if(!car.isParked) {
    animateCar(car);
  } else {
    animatePerson(car);
  }
}

function animatePerson(car) {
  var tempTile = parkingLot.getTile(9, 22);
  var personPath = state.updateCar(car, tempTile, false);

  car.person.setPos(car.getX, car.getY);
  car.person.startAnimation(personPath, state.getPersons, callbackPerson);
}

function callbackPerson() {
  var cars = state.getCars;
  var tempCar;
  for(var i = 0; i < cars.length; i++) {
    tempCar = cars[i];
    if(tempCar.person.isFinished)
      clearInterval(tempCar.timer);
  }
}

function animateCar(car) {
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

function getDirection(car) {

  var carPos = {};
  carPos.x = Math.floor(car.getX / 24);
  carPos.y = Math.floor(car.getY / 24);

  var startTile = parkingLot.getTile(carPos.x, carPos.y);

  var newTile = null;

  if(car.prevStep && (car.prevStep == 'down' || car.prevStep == 'up')){
    if(startTile.getIndex > 455) {
      newTile = parkingLot.getTile(0, carPos.y);
      car.prevStep = 'left';
    } else {
      newTile = parkingLot.getTile(19, carPos.y);
      car.prevStep = 'right';
    }
  } else {
    if (car.isGoing == 'down') {
       newTile = parkingLot.getTile(carPos.x, carPos.y + 2);
       car.prevStep = 'up';
     } else {
        newTile = parkingLot.getTile(carPos.x, carPos.y - 2);
        car.prevStep = 'down';
     }
  }

  return newTile;
}

//Listens when the mouse is moved over the canvas
personCanvas.addEventListener('mousemove', function(evt){
  mousePos = mouse.getMousePos(personCanvas, evt);
  var tile = parkingLot.getTile(mousePos.x, mousePos.y);
}, false);

//Listens when a click occurs, used to to switch between free and taken parking spaces
personCanvas.addEventListener('click', function(){
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


function pad(val) {
    return val > 9 ? val : "0" + val;
}


