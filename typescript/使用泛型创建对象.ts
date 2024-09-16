// https://www.developers.pub/article/1035122#head14
class FirstClass {
  id: number | undefined;
}
class SecondClass {
  name: string | undefined;
}
class GenericCreator<T> {
  create<T>(c: { new (): T }): T {
    return new c();
  }
  create1<T>(c: { new (a: number): T }, num: number): T {
    return new c(num);
  }
}
// interface Point {
//   new (x: number, y: number): Point;
// }
// // 构造函数类型字面量
// new <T1, T2,...> (p1, p2, ...) => R
// // 包含构造签名的对象类型字面量
// { new <T1, T2, ...>(p1, p2, ...) : R}
// new (x: number, y: number) => Point
// {
//   new (x: number, y: number): Point
// }
interface Point {
  x: number;
  y: number;
}
interface PointConstructor {
  new (x: number, y: number): Point;
}
class Point2D implements Point {
  readonly x: number;
  readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
function newPoint(
  pointConstructor: PointConstructor,
  x: number,
  y: number,
): Point {
  return new pointConstructor(x, y);
}

const point: Point = newPoint(Point2D, 1, 2);
