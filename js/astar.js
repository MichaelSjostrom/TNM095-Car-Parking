class Astar{

  constructor(parkingLot) {
    this.parkingLot = parkingLot;
  };

  search(startPos, end) {
    var openList = [];
    var closedList = [];

    startPos.g = 0;
    openList.push(startPos);

    var result = [];

    while (openList.length > 0) {
      var tempIndex = 0;
      for (var i = 0; i < openList.length; i++) {
        if (openList[i] < openList[tempIndex]) tempIndex = i;
      }

      var currNode = openList[tempIndex];

      if (currNode.getIndex == end.getIndex) {
        var curr = currNode;
        while (curr.parent) {
          result.push(curr.index);
          curr = curr.parent;
        }
      }

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
          continue;
        }

        var g = currNode.g + 1;
        var gIsBest = false;

        var index3 = openList.indexOf(neighbor);

        if (index3 == -1) {
          gIsBest = true;
          neighbor.h = this.heuristic(neighbor, end);
          openList.push(neighbor);
        } else if (g < neighbor.g) {
          gIsBest = true;
        }

        if (gIsBest) {
          neighbor.parent = currNode;
          neighbor.g = g;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }
    console.log(result);
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
    if(map[x - 1] && map[x - 1][y]){
        result.push(map[x - 1][y]);
    }

    // East
    if(map[x + 1] && map[x + 1][y]){
        result.push(map[x + 1][y]);
    }

    // North
    if(map[x] && map[x][y - 1]){
        result.push(map[x][y - 1]);
    }

    // South
    if(map[x] && map[x][y + 1]){
        result.push(map[x][y + 1]);
    }


    return result;
  }

  updateMap(parkingLot) {
    this.parkingLot = parkingLot;
  }
}
