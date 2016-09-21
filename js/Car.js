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

    var self = this;
    var otherReq = false;
    // We need different constrains here and the pos needs to rely on the tiles
    if (self.counter == 100) {
      this.xPos--;
      var xPos = self.xPos;
      var yPos = self.yPos;
      console.log('turning');
      otherReq = true;
      window.requestAnimFrame(function() {
        // Clear previous frame
        self.context.clearRect(0, 0, self.width, self.height);
        self.context.translate(self.width / 2, self.height / 2);
        self.context.rotate(90 * Math.PI / 180);
        self.renderCar(self.xPos, self.yPos);
        self.context.translate((-1) * self.width / 2, (-1) * self.height / 2);
        self.animateCar();
      });
    }

    if (self.counter < 200 && !otherReq) {
      console.log('fwd');
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);
      self.renderCar(self.xPos, self.yPos);
      // Do again
      window.requestAnimFrame(function() { self.animateCar(); });
    }
  }

  turnRight() {
    console.log('turning');
    this.context.translate(this.width / 2, this.height / 2);
    this.context.rotate(90 * Math.PI / 180);
    this.context.translate(this.xPos, this.yPos);
  }
}
