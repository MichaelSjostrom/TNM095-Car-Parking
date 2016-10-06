
class State {
  constructor(parkingLot) {
    this.cars = [];
    this.parkingLot = parkingLot;
    astar = new Astar();
    astar.updateMap(this.parkingLot);
  }

  get getCars() {
    return this.cars;
  }

  addCar(car) {
    this.cars.push(car);
    car.renderCar(0, 0);
  }

  updateCar(tile) {
    var startPos = {};
    startPos.x = Math.floor(car.getX / 24);
    startPos.y = Math.floor(car.getY / 24);

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

    car.startAnimation(path);

  }

}
