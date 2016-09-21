class Astar{

  constructor(parkingLot) {
    this.parkingLot = parkingLot;
  };

  search(startPos) {

  }

  neighbors(tile){
    var result = [];
    var x = tile.getX;
    var y = tile.getY;
    var map = this.parkingLot.getMap;

    // West
    if(map[x - 1] && map[x - 1][y] && map[x - 1][y].getType != 'parking'){
        result.push(map[x - 1][y]);
        //var tile = map[x - 1][y];
        //console.log("West tile = " + tile.getIndex);
    }

    // East
    if(map[x + 1] && map[x + 1][y] && map[x + 1][y].getType != 'parking'){
        result.push(map[x + 1][y]);
        //var tile = map[x + 1][y];
        //console.log("East tile = " + tile.getIndex);
    }

    // North
    if(map[x] && map[x][y - 1] && map[x][y - 1].getType != 'parking'){
        result.push(map[x][y - 1]);
        //var tile = map[x][y - 1];
        //console.log("North tile = " + tile.getIndex);
    }

    // South
    if(map[x] && map[x][y + 1] && map[x][y + 1].getType != 'parking' ){
        result.push(map[x][y + 1]);
        //var tile = map[x][y + 1];
        //console.log("South tile = " + tile.getIndex);
    }


    return result;
  }

  updateMap(parkingLot) {
    this.parkingLot = parkingLot;
  }
}
