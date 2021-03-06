class Car {
  constructor(canvas, color, prevStep, person) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.color = color;
    this.carSize = { xSize: 22, ySize: 22 };
    this.isParked = false;
    this.path = [];
    this.cars = [];
    this.prevStep = prevStep;
    this.person = person;
  }

  get getX() {
    return this.xPos;
  }

  get getY() {
    return this.yPos;
  }

  clear() {
    // Clear previous frame
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderCar(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.context.fillStyle = this.color;
    this.context.fillRect(xPos + 1, yPos + 1, this.carSize.xSize, this.carSize.ySize);
    this.renderView(xPos, yPos);
  }

  // Render the view of the driver
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

  startAnimation(path, cars, callback) {
    this.callback = callback;
    this.cars = cars;
    this.path = path;

    if (!path.length) {
      this.path = [];
      callback(this);
      return null;
    }
    if (path[0].axis == 'Y') this.moveY(path[0].dir, path);
    else if (path[0].axis == 'X') this.moveX(path[0].dir, path);

    return;
  }

  moveX(variable) {
    this.xPos += variable;
    if ((this.xPos + variable) % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);
      for (var i = 0; i < this.cars.length; i++) {
        var car = this.cars[i];
        car.renderCar(car.getX, car.getY);
      }

      // Do again
      window.requestAnimFrame(() => { this.moveX(variable); });
    } else {
      this.xPos += variable;
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);
      for (var i = 0; i < this.cars.length; i++) {
        var car = this.cars[i];
        car.renderCar(car.getX, car.getY);
      }

      this.path.splice(0, 1);
      this.startAnimation(this.path, this.cars, this.callback);
    }
  }

  moveY(variable) {
    this.yPos += variable;
    if ((this.yPos + variable) % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.cars.length; i++) {
        var car = this.cars[i];
        car.renderCar(car.getX, car.getY);
      }

      // Render car with new pos
      this.renderCar(this.xPos, this.yPos);

      // Do again
      window.requestAnimFrame(() => { this.moveY(variable); });
    } else {
      this.yPos += variable;
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.cars.length; i++) {
        var car = this.cars[i];
        car.renderCar(car.getX, car.getY);
      }

      this.path.splice(0, 1);
      this.startAnimation(this.path, this.cars, this.callback);
    }
  }
}
