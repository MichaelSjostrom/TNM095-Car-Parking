class Car {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.context.fillStyle = 'blue';
    this.carSize = { xSize: 22, ySize: 22 };
    this.isParked = false;
  }

  get getX() {
    return this.xPos;
  }

  get getY() {
    return this.yPos;
  }

  renderCar(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.context.fillStyle = 'blue';
    this.context.fillRect(xPos, yPos, this.carSize.xSize, this.carSize.ySize);
    this.renderView(xPos, yPos);
  }

  renderView(xPos, yPos){
    this.context.fillStyle = "rgba(242,255,0,0.4)";

    this.context.fillRect(xPos + 24, yPos, 24, 24);
    this.context.fillRect(xPos, yPos + 24, 24, 24);

    this.context.fillRect(xPos - 24, yPos, 24, 24);
    this.context.fillRect(xPos, yPos - 24, 24, 24);

    this.context.fillRect(xPos + 24, yPos + 24, 24, 24);
    this.context.fillRect(xPos - 24, yPos - 24, 24, 24);

    this.context.fillRect(xPos + 24, yPos - 24, 24, 24);
    this.context.fillRect(xPos - 24, yPos + 24, 24, 24);

  }

  startAnimation(path) {
    this.path = path;
    if (!path[0]) return;
    if (path[0].axis == 'Y') this.moveY(path[0].dir, path);
    else this.moveX(path[0].dir, path);
  }

  moveX(variable, path) {
    this.xPos += variable;
    if ((this.xPos + variable) % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      window.requestAnimFrame(() => { this.moveX(variable); });
    } else {
      this.path.splice(0, 1);
      this.startAnimation(this.path);
    }
  }

  moveY(variable) {
    this.yPos += variable;
    if ((this.yPos + variable) % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      window.requestAnimFrame(() => { this.moveY(variable); });
    } else {
      this.path.splice(0, 1);
      this.startAnimation(this.path);
    }
  }
}
