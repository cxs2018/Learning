class Graphic {
  move(x, y) {}
  draw() {}
}

class Dot extends Graphic {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  draw() {
    console.log(`在坐标位置(${this.x},${this.y})处绘制一个点`);
  }
}

class Circle extends Dot {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }

  draw() {
    console.log(
      `在坐标位置(${this.x},${this.y})处绘制一个半径为${this.radius}的圆`,
    );
  }
}

class CompoundGraphic extends Graphic {
  constructor() {
    super();
    this.children = [];
  }

  add(graphic) {
    this.children.push(graphic);
  }

  remove(graphic) {
    // 移除 graphic 项
  }

  move(x, y) {
    for (const child in this.children) {
      this.children[child].move(x, y);
    }
  }

  draw() {
    for (const child in this.children) {
      this.children[child].draw();
    }
  }
}

class ImageEditor {
  constructor() {
    this.all = null;
  }

  load() {
    this.all = new CompoundGraphic();
    this.all.add(new Dot(1, 2));
    this.all.add(new Circle(5, 3, 10));

    this.all.draw();
  }
}

new ImageEditor().load();
