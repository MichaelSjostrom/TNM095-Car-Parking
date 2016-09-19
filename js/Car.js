class Car {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.xPos = this.yPos = 10;
    this.requestId = 'hej';
    this.context.fillStyle = 'red';
    this.counter = 0;
    this.carSize = { xSize: 10, ySize: 15 };
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

    if (this.xPos > this.width - 5) {
      this.xPos = 0;
    }

    if (this.requestId && this.counter < 500) {
      // clear
      this.context.clearRect(0, 0, this.width, this.height);

      // render new car pos
      this.renderCar(this.xPos, this.yPos);

      var self = this;
      window.requestAnimFrame(function() { self.animateCar(); });

    } else {
      cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
}
