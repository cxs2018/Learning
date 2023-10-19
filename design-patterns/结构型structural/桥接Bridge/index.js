/**
 * 抽象公司
 */
class Corp {
  /**
   * 公司生产产品，但是每家公司生产的产品不一样，由实现类实现
   */
  produce() {}

  /**
   * 每家公司的销售动作不一样
   */
  sell() {}

  /**
   * 公司赚钱的方法
   */
  makeMoney() {
    this.produce();
    this.sell();
  }
}

/**
 * 房地产公司
 */
class HouseCorp extends Corp {
  produce() {
    console.log("房地产公司盖房子...");
  }
  sell() {
    console.log("房地产公司出售房子...");
  }
  makeMoney() {
    super.makeMoney();
    console.log("房地产公司赚大钱了...");
  }
}

/**
 * 服装公司
 */
class ClothesCorp extends Corp {
  produce() {
    console.log("服装公司生产服装...");
  }
  sell() {
    console.log("服装公司生产服装...");
  }
  makeMoney() {
    super.makeMoney();
    console.log("服装公司赚小钱...");
  }
}

class Client {
  main() {
    console.log("------房地产公司是这样运行的------");
    const houseCrop = new HouseCorp();
    houseCrop.makeMoney();
    console.log("------服装公司是这样运行的------");
    const clothesCrop = new ClothesCorp();
    clothesCrop.makeMoney();
  }
}

new Client().main();

// 分离产品和公司
{
  class Product {
    beProducted() {}
    beSelled() {}
  }

  class House extends Product {
    beProducted() {
      console.log("生产出房子");
    }
    beSelled() {
      console.log("卖房子");
    }
  }

  class IPod extends Product {
    beProducted() {
      console.log("生产ipod");
    }
    beSelled() {
      console.log("卖ipod");
    }
  }

  class Crop {
    constructor(product) {
      this.product = product;
    }
    makeMoney() {
      this.product.beProducted();
      this.product.beSelled();
    }
  }

  class ConcreteCrop extends Crop {
    constructor(product) {
      super(product);
    }
    makeMoney() {
      super.makeMoney();
      console.log("公司赚钱了");
    }
  }

  class Client {
    main() {
      console.log("------房地产公司是这样运行的------");
      const houseCrop = new ConcreteCrop(new House());
      houseCrop.makeMoney();
    }
  }

  new Client().main();
}
