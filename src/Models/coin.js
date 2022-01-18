export class Coin {
  constructor(image, name, symbol, price, pricechange1h, pricechange1d, sparkline) {
    this.image = image;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.pricechange1h = pricechange1h;
    this.pricechange1d = pricechange1d;
    this.sparkline = sparkline;
  }
}