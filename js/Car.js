class Car {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.xPos = this.yPos = 0;
    this.requestId = 'hej';
    this.context.fillStyle = 'blue';
    this.counter = 0;
    this.carSize = { xSize: 15, ySize: 10 };
  }

  renderCar(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.context.fillRect(xPos, yPos, this.carSize.xSize, this.carSize.ySize);
  }

  moveX(variable) {
    this.counter++;

    this.carSize = { xSize: 15, ySize: 10 };

    this.xPos = variable > 0 ? this.xPos + 1 : this.xPos - 1;

    // We need different constrains here and the pos needs to rely on the tiles
    if (this.xPos > this.width - 5) {
      this.xPos = 0;
    }

    if (this.requestId && this.counter < 10) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      var self = this;
      window.requestAnimFrame(function() { self.moveX(variable); });

    } else {
      this.counter = 0;
    }
  }

  moveY(variable) {
    this.counter++;

    this.carSize = { xSize: 10, ySize: 15 };

    this.yPos = variable > 0 ? this.yPos + 1 : this.yPos - 1;

    // We need different constrains here and the pos needs to rely on the tiles
    if (this.yPos > this.width - 5) {
      this.yPos = 0;
    }

    if (this.requestId && this.counter < 10) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      var self = this;
      window.requestAnimFrame(function() { self.moveY(variable); });

    } else {
      this.counter = 0;
    }
  }

  turnRight() {
    this.context.translate(this.width / 2, this.height / 2);
    this.context.rotate(90 * Math.PI / 180);
    this.context.translate(this.xPos, this.yPos);
  }
}
