
class State {
  constructor(parkingLot) {
    this.cars = [];
    this.persons = [];
    this.parkingLot = parkingLot;
    astar = new Astar();
    astar.updateMap(this.parkingLot);
  }

  get getCars() {
    return this.cars;
  }

  get getPersons() {
    return this.persons;
  }

  addCar(car) {
    this.cars.push(car);
    car.renderCar(0, 0);
  }

  addPerson(person){
    this.persons.push(person);
  }

  removeCar() {
    this.cars.pop();
    this.cars[0].clear();
    for (var i = 0; i < this.cars.length; i++) {
      var car = this.cars[i];
      car.renderCar(car.getX, car.getY);
    }
  }

  updateCar(car, tile, find) {
    var startPos = {};
    startPos.x = Math.floor(car.getX / 24);
    startPos.y = Math.floor(car.getY / 24);
    var result;

    var startTile = parkingLot.getTile(startPos.x, startPos.y);
    if(find)
      result = astar.searchOpenSpot(startTile, tile, car);
    else
      result = astar.search(startTile, tile);

    result.push(startTile.index);
    result = result.reverse();

    var path = [];

    for (var i = 0; i < result.length - 1; i++) {
      if (result[i + 1] == result[i] + 1) {
        // Down
        path.push({axis:'Y', dir:1});
      }
      else if (result[i + 1] == result[i] - 1) {
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

    return path;

  }

}
