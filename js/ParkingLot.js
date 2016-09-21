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
          result[i][j] = new Tile(true, 'parking', indexCounter);
        } else {
          result[i][j] = new Tile(true, 'road', indexCounter);
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
