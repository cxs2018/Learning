class MazeBuilder {
  buildMaze() {}
  buildRoom(roomNumber) {}
  buildDoor(roomNumber1, roomNumber2) {}
  getMaze() {}
}

class StandardMazeBuilder extends MazeBuilder {
  constructor() {
    super();
    this._currentMaze = null;
  }
  buildMaze() {
    this._currentMaze = new Maze();
  }
  buildRoom(roomNumber) {
    if (!this._currentMaze.roomNo(roomNumber)) {
      const room = new Room(roomNumber);
      this._currentMaze.addRoom(room);

      room.setSide(North, new Wall());
      room.setSide(South, new Wall());
      room.setSide(East, new Wall());
      room.setSide(West, new Wall());
    }
  }
  buildDoor(roomNumber1, roomNumber2) {
    const r1 = this._currentMaze.roomNo(roomNumber1);
    const r2 = this._currentMaze.roomNo(roomNumber2);
    const d = new Door(r1, r2);

    r1.setSide(this.commonWall(r1, r2), d);
    r2.setSide(this.commonWall(r2, r1), d);
  }
  getMaze() {
    return this._currentMaze;
  }

  /**
   * 决定两个房间之间的公共墙壁方位
   * @param room1
   * @param room2
   */
  commonWall(room1, room2) {}
}

// 原抽象工厂版本
function createMaze2(factory) {
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

/**
 * 将这个CreateMaze版本与原来的相比，注意生成器是如何隐藏迷宫的内部表示的一即定
 * 义房间、门和墙壁的那些类一以及这些部件是如何组装成最终的迷宫的。有人可能猜测到
 * 有一些类是用来表示房间和门的，但没有迹象显示哪个类是用来表示墙壁的。这就使得改变
 * 个迷宫的表示方式要容易一些，因为所有MazeBuilder的客户都不需要被改变。
 * @param builder
 * @returns {*}
 */
function createMaze(builder) {
  builder.buildMaze();

  builder.buildRoom(1);
  builder.buildRoom(2);
  builder.buildDoor(1, 2);

  return builder.getMaze();
}

// let builder = new StandardMazeBuilder();
//
// createMaze(builder);
// maze = builder.getMaze();

class CountingMazeBuilder extends MazeBuilder {
  constructor() {
    super();
    this._rooms = this._doors = 0;
  }
  buildDoor(roomNumber1, roomNumber2) {
    this._doors++;
  }
  buildRoom(roomNumber) {
    this._rooms++;
  }
  getCounts() {
    return { rooms: this._rooms, doors: this._doors };
  }
}

const builder = new CountingMazeBuilder();

createMaze(builder);
console.log(builder.getCounts());
