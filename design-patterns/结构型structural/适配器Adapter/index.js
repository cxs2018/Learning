/**
 * 圆孔
 */
class RoundHole {
  constructor(radius) {
    this.radius = radius;
  }

  /**
   * 获取孔的半径
   * @returns {*}
   */
  getRadius() {
    return this.radius;
  }

  /**
   * 看钉能否放进孔内
   * @param roundReg
   * @returns {boolean}
   */
  fits(roundReg) {
    // 孔的半径 大于等于 钉的半径
    return this.getRadius() >= roundReg.getRadius();
  }
}

/**
 * 圆钉
 */
class RoundReg {
  constructor(radius) {
    this.radius = radius;
  }

  /**
   * 获取圆钉的半径
   * @returns {*}
   */
  getRadius() {
    return this.radius;
  }
}

/**
 * 方钉
 */
class SquarePeg {
  constructor(width) {
    this.width = width;
  }

  /**
   * 获取方钉的宽度
   * @returns {*}
   */
  getWidth() {
    return this.width;
  }
}

/**
 * 方钉适配器，假扮为圆钉
 */
class SquarePegAdapter extends RoundReg {
  constructor(squarePeg) {
    super(squarePeg);
    this.squarePeg = squarePeg;
  }

  /**
   * 可把方钉看做，以方钉的对角线的一半为半径的圆钉
   * @returns {number}
   */
  getRadius() {
    return (this.squarePeg.getWidth() * Math.sqrt(2)) / 2;
  }
}

// 一个半径为5的圆孔
const hole = new RoundHole(5);
// 一个半径为5的圆钉
const rpeg = new RoundReg(5);
console.log("半径为5的圆孔可以放下半径为5的圆钉吗？", hole.fits(rpeg));

// 一个宽度为5的方钉
const small_sqpeg = new SquarePeg(5);
// 一个宽度为10的方钉
const large_sqpeg = new SquarePeg(10);
// console.log(hole.fits(small_sqpeg));

const small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg);
const large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg);
console.log(
  "半径为5的圆孔可以放下宽度为5的方钉吗？",
  hole.fits(small_sqpeg_adapter),
);
console.log(
  "半径为5的圆孔可以放下宽度为10的方钉吗？",
  hole.fits(large_sqpeg_adapter),
);
