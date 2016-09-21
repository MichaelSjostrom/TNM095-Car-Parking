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

  renderCar(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.context.fillRect(xPos, yPos, this.carSize.xSize, this.carSize.ySize);
  }

  moveX(variable) {
    this.xPos += variable;
    if ((this.xPos + variable) % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      window.requestAnimFrame(() => { this.moveX(variable); });
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
    }
  }
}
