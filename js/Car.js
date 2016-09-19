class Car {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.xPos = this.yPos = 10;
    this.requestId = 'hej';
    this.context.fillStyle = 'blue';
    this.counter = 0;
    this.carSize = { xSize: 15, ySize: 10 };
  }

  renderCar(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;

    console.log(xPos, yPos);

    this.context.fillRect(xPos, yPos, this.carSize.xSize, this.carSize.ySize);
  }

  startCar() {
    var self = this;

    window.requestAnimFrame(function() { self.animateCar(); });
  }

  animateCar() {
    this.counter++;

    this.xPos++;

    // We need different constrains here and the pos needs to rely on the tiles
    if (this.xPos > this.width - 5) {
      this.xPos = 0;
    }

    if (this.requestId && this.counter < 500) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      var self = this;
      window.requestAnimFrame(function() { self.animateCar(); });

    } else {
      // Cancel animation
      cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
}
