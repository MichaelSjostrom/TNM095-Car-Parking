class Mouse{

  constructor(){

  };

  getMousePos(canvas, evt) {
    //Magiskt nummer, hittar inte varför canvas har en offset.
    var posX = evt.clientX - 7;
    var posY = evt.clientY - 7;

    return {
      x: Math.floor(posX/tileSize),
      y: Math.floor(posY/tileSize)
    };
  }

}
