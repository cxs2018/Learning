const North = "North";
const South = "South";
const East = "East";
const West = "West";

class MapSite {
  enter() {}
}

class Room extends MapSite {
  constructor(roomNumber) {
    super();
    this._roomNumber = roomNumber;
    this._sides = {};
  }

  getSide(direction) {
    return this._sides[direction];
  }

  setSide(direction, mapSite) {
    this._sides[direction] = mapSite;
  }

  enter() {}

  getRoomNumber() {
    return this._roomNumber;
  }
}

class Wall extends MapSite {
  enter() {}
}

class Door extends MapSite {
  constructor(room1, room2) {
    super();
    this._room1 = room1;
    this._room2 = room2;
    this._isOpen = true;
  }

  enter() {}

  otherSideFrom() {}
}

class Maze {
  constructor() {
    this._rooms = {};
  }
  addRoom(room) {
    this._rooms[room.getRoomNumber()] = room;
  }

  roomNo(roomNumber) {
    return this._rooms[roomNumber];
  }
}

class MazeFactory {
  makeMaze() {
    return new Maze();
  }
  makeWall() {
    return new Wall();
  }
  makeRoom(n) {
    return new Room(n);
  }
  makeDoor(r1, r2) {
    return new Door(r1, r2);
  }
}

class MazeGame {
  /**
   * 创建迷宫
   * 缺点：对类名进行了硬编码，如Maze、Room、Door、Wall，使得很难用不同的组件创建迷宫
   * @returns {Maze}
   */
  createMaze() {
    const aMaze = new Maze();
    const r1 = new Room(1);
    const r2 = new Room(2);
    const theDoor = new Door(r1, r2);

    aMaze.addRoom(r1);
    aMaze.addRoom(r2);

    r1.setSide(North, new Wall());
    r1.setSide(East, theDoor);
    r1.setSide(South, new Wall());
    r1.setSide(West, new Wall());

    r2.setSide(North, new Wall());
    r2.setSide(East, new Wall());
    r2.setSide(South, new Wall());
    r2.setSide(West, theDoor);

    return aMaze;
  }

  /**
   * 一个工厂封装创建产品对象的责任和过程，如这里的factory，它将客户与类的实现分离。客户通过它们的抽象接口操纵实例。产品的类名也在
   * 具体工厂的实现中被分离；它们不出现在客户代码中。创建迷宫、创建房间、创建门、创建墙不在硬编码类名，由工厂实现相应的创建过程，使得修改具体工厂的内容即可快速修改客户行为
   * @param factory
   * @returns {Maze}
   */
  createMaze2(factory) {
    const aMaze = factory.makeMaze();
    const r1 = factory.makeRoom(1);
    const r2 = factory.makeRoom(2);
    const theDoor = factory.makeDoor(r1, r2);

    aMaze.addRoom(r1);
    aMaze.addRoom(r2);

    r1.setSide(North, factory.makeWall());
    r1.setSide(East, theDoor);
    r1.setSide(South, factory.makeWall());
    r1.setSide(West, factory.makeWall());

    r2.setSide(North, factory.makeWall());
    r2.setSide(East, factory.makeWall());
    r2.setSide(South, factory.makeWall());
    r2.setSide(West, theDoor);

    return aMaze;
  }
}

class EnchantedMazeFactory extends MazeFactory {
  makeRoom(n) {
    return new EnchantedRoom(n, this.castSpell());
  }

  makeDoor(r1, r2) {
    return new DoorNeedingSpell(r1, r2);
  }

  castSpell() {}
}

class BombedMazeFactory extends MazeFactory {
  makeWall() {
    return new BombedWall();
  }
  makeRoom(n) {
    return new RoomWithABomb(n);
  }
}

const mazeGame = new MazeGame();
// 创建普通迷宫
mazeGame.createMaze2(new MazeFactory());
// 创建带炸弹的迷宫
mazeGame.createMaze2(new BombedMazeFactory());
// 创建魔法迷宫
mazeGame.createMaze2(new EnchantedMazeFactory());
