class Tile{

  constructor(taken, type, index){
    this.taken = taken;
    this.type = type;
    this.index = index;
  };

  get isTaken(){
    return this.taken;
  };

  get getIndex(){
    return this.index;
  };

  get getType(){
    return this.type;
  }
}
