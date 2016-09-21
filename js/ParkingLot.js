class ParkingLot{

  constructor(){
    this.map = this.createParkingLot();
  };

  createParkingLot(){
    var result = [];
    var indexCounter = 0;
    for( var i = 0; i < 40; i++){
      result[i] = [];
      for( var j = 0; j < 24; j++){
        if(j%2 == 0 && j !== 0 &&i !== 0 && i !== 39){
          result[i][j] = new Tile(true, 'parking', indexCounter, i, j);
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

  getTile(x, y){
    return this.map[x][y];
  }

}
