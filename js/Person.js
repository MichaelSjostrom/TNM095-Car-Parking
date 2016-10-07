class Person {
  constructor(canvas, color) {
    this.canvas = canvas;
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.context = canvas.getContext('2d');
    this.color = color;
    this.personSize = { xSize: 6, ySize: 6 };
    this.path = [];
    this.persons = [];
    this.isFinished = false;
  }

  get getX() {
    return this.xPos;
  }

  get getY() {
    return this.yPos;
  }

  setPos(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  clear() {
    // Clear previous frame
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPerson(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.context.fillStyle = this.color;
    this.context.fillRect(xPos + 9, yPos + 9, this.personSize.xSize, this.personSize.ySize);
  }

  startAnimation(path, persons, callbackPerson) {
    this.persons = persons;
    this.path = path;
    this.callbackPerson = callbackPerson;

    if (!path.length) {
      this.isFinished = true;
      this.path = [];
      callbackPerson();
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
      for (var i = 0; i < this.persons.length; i++) {
        var person = this.persons[i];
        person.renderPerson(person.getX, person.getY);
      }

      // Do again
      window.requestAnimFrame(() => { this.moveX(variable); });
    } else {
      this.xPos += variable;
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);
      for (var i = 0; i < this.persons.length; i++) {
        var person = this.persons[i];
        person.renderPerson(person.getX, person.getY);
      }

      this.path.splice(0, 1);
      this.startAnimation(this.path, this.persons, this.callbackPerson);
    }
  }

  moveY(variable) {
    this.yPos += variable;
    if ((this.yPos + variable) % 24 != 0) {
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.persons.length; i++) {
        var person = this.persons[i];
        person.renderPerson(person.getX, person.getY);
      }

      // Render person with new pos
      this.renderPerson(this.xPos, this.yPos);

      // Do again
      window.requestAnimFrame(() => { this.moveY(variable); });
    } else {
      this.yPos += variable;
      // Clear previous frame
      this.context.clearRect(0, 0, this.width, this.height);

      for (var i = 0; i < this.persons.length; i++) {
        var person = this.persons[i];
        person.renderPerson(person.getX, person.getY);
      }

      this.path.splice(0, 1);
      this.startAnimation(this.path, this.persons, this.callbackPerson);
    }
  }
}
