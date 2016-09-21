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

      var neighbors = this.neighbors();

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

  neighbors(tile, map){
    var result = [];
    //West

    return result;
  }

  updateMap(parkingLot) {
    this.parkingLot = parkingLot;
  }
}
