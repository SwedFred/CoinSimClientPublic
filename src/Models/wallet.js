export class Wallet {
  constructor(transactionHistory, assets, initialCash, currentCash, profit) {
    this.transactionHistory = transactionHistory ? transactionHistory : [];
    this.assets = assets ? assets : [];
    this.totalCash = initialCash ? initialCash : 1000;
    this.currentCash = currentCash ? currentCash : 1000;
    this.profit = profit ? profit : 0;
  }
}