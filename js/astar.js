class Astar{

  constructor(parkingLot) {
    this.parkingLot = parkingLot;
  };

  search(startPos) {
    var openList = [];
    var closedList = [];

    openList.push(startPos);

    while (openList.length > 0) {
      var tempIndex = 0;
      for (var i = 0; i < openList.length; i++) {
        if (openList[i] < openList[tempIndex]) tempIndex = i;
      }

      var currNode = openList[tempIndex];
      var index = openList.indexOf(currNode);
      if (index != -1) openList.splice(index, 1);
      closedList.push(currNode);

      var neighbors = this.neighbors(currNode);

      // Find which neighbor is the best
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        var index2 = closedList.indexOf(neighbor);
        if (index2 != -1) {
          console.log('this is not a valid node');
        }
      }
    }
  }

  heuristic(curr, end) {
    var x = Math.abs(curr.getX - end.getX);
    var y = Math.abs(curr.getY - end.getY);

    return x + y;
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
