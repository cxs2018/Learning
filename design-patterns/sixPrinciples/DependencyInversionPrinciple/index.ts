interface DatabaseInterface {
  saveOrder(orderData: any): void;
  getOrder(orderId: number): any;
}
// MySQL 数据库操作类
class MySQLDatabase implements DatabaseInterface {
  saveOrder(orderData: any): void {
    console.log(`Saving order to MySQL: ${orderData}`);
  }
  getOrder(orderId: number): any {
    return `Order data from MySQL for id ${orderId}`;
  }
}
// PostgreSQL  数据库操作类
class PostgreSQLDatabase implements DatabaseInterface {
  saveOrder(orderData: any): void {
    console.log(`Saving order to PostgreSQL: ${orderData}`);
  }
  getOrder(orderId: number): any {
    return `Order data from PostgreSQL for id ${orderId}`;
  }
}

class OrderProcessor {
  private database: DatabaseInterface;
  constructor(database: DatabaseInterface) {
    this.database = database;
  }

  processOrder(orderData: any): void {
    this.database.saveOrder(orderData);
  }

  getOrder(orderId: number): any {
    return this.database.getOrder(orderId);
  }
}

const mySQL = new OrderProcessor(new MySQLDatabase());
const postgreSQL = new OrderProcessor(new PostgreSQLDatabase());

mySQL.processOrder("hello world");
mySQL.getOrder(1234);
postgreSQL.processOrder("hello world");
postgreSQL.getOrder(12345);
