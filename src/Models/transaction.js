export class Transaction {
  constructor(name, action, amount, price, date) {
    this.name = name;
    this.action = action;
    this.amount = amount;
    this.price = price;
    this.date = date;
  }
}