class Car {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.context.translate(1, 1);
    this.context.fillStyle = 'blue';
    this.carSize = { xSize: 22, ySize: 22 };
  }

  renderCar(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.context.fillRect(xPos, yPos, this.carSize.xSize, this.carSize.ySize);
  }

  moveX(variable) {
    this.xPos = variable > 0 ? this.xPos + 1 : this.xPos - 1;

    if (this.xPos % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      var self = this;
      window.requestAnimFrame(function() { self.moveX(variable); });

    }
  }

  moveY(variable) {

    this.yPos = variable > 0 ? this.yPos + 1 : this.yPos - 1;

    if (this.yPos % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      var self = this;
      window.requestAnimFrame(function() { self.moveY(variable); });

    }
  }

  turnRight() {
    this.context.translate(this.width / 2, this.height / 2);
    this.context.rotate(90 * Math.PI / 180);
    this.context.translate(this.xPos, this.yPos);
  }
}
