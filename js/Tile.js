class Tile{

  constructor(taken, type, index, posX, posY){
    this.taken = taken;
    this.type = type;
    this.index = index;
    this.posX = posX;
    this.posY = posY;
  };

  get isTaken(){
    return this.taken;
  };

  get getIndex(){
    return this.index;
  };

  get getType(){
    return this.type;
  };

  get getX(){
    return this.posX;
  };

  get getY(){
    return this.posY
  };

  setTaken(boolean){
    this.taken = boolean;
  };

  setType(type){
    this.type = type;
  };
}
