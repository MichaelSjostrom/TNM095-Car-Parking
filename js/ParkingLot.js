class ParkingLot{

  constructor(){
    this.map = this.createParkingLot();
  };

  createParkingLot(){
    var result = [];
    var indexCounter = 0;

    for( var i = 0; i < 20; i++){
      result[i] = [];
      for( var j = 0; j < 24; j++){
        if(j%2 != 0 &&i !== 0 && i !== 19){
          var random = Math.floor((Math.random() * 24) + j) > j ? true : false;
          //var random = Math.floor((Math.random() * 24) + 1) < j ? true : false;

          result[i][j] = new Tile(random, 'parking', indexCounter, i, j);
        } else {
          result[i][j] = new Tile(true, 'road', indexCounter, i, j);
        }
        indexCounter++;
        }
      }

    return result;
  }

  get getMap(){
    return this.map;
  }

  getTile(x, y) {
    return this.map[x][y];
  }

  reset() {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 24; j++) {
        this.map[i][j].f = 0;
        this.map[i][j].g = 0;
        this.map[i][j].h = 0;
        this.map[i][j].parent = null;
      }
    }
  }

  getViewableTiles(x, y){
    var surrTiles = [];

    // West
    if(this.map[x - 1] && this.map[x - 1][y]){
        surrTiles.push(this.map[x - 1][y]);
    }

    // East
    if(this.map[x + 1] && this.map[x + 1][y]){
        surrTiles.push(this.map[x + 1][y]);
    }

    // North
    if(this.map[x] && this.map[x][y - 1]){
        surrTiles.push(this.map[x][y - 1]);
    }

    // South
    if(this.map[x] && this.map[x][y + 1]){
        surrTiles.push(this.map[x][y + 1]);
    }

    // NorthWest
    if(this.map[x - 1] && this.map[x - 1][y - 1]){
        surrTiles.push(this.map[x - 1][y - 1]);
    }

    // SouthWest
    if(this.map[x - 1] && this.map[x - 1][y + 1]){
        surrTiles.push(this.map[x - 1][y + 1]);
    }

    // NorthEast
    if(this.map[x + 1] && this.map[x + 1][y - 1]){
        surrTiles.push(this.map[x + 1][y - 1]);
    }

    // SouthEast
    if(this.map[x + 1] && this.map[x + 1][y + 1]){
        surrTiles.push(this.map[x + 1][y + 1]);
    }

    return surrTiles;
  }

}
