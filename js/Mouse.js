class Mouse{

  constructor(){

  };

  getMousePos(canvas, evt) {
    //Magiskt nummer, hittar inte varför canvas har en offset.
    var posX = evt.clientX;
    var posY = evt.clientY;

    return {
      x: Math.floor(posX/tileSize),
      y: Math.floor(posY/tileSize)
    };
  }

}
