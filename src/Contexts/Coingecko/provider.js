import React, { Children, useEffect, useState } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { CoinContext } from './context';
import { Coin } from '../../Models/coin';
import { Asset } from '../../Models/asset';
import { Wallet } from '../../Models/wallet';
import { Transaction } from '../../Models/transaction';
import { useConfig } from '../Config/use';

export const CoinProvider = ({children}) => {
  const { state: {config}} = useConfig();
  const [order, setOrder] = useState(0);
  const [filter, setFilter] = useState("");
  const [coins, setCoins] = useState();
  const [chartIndex, setChartIndex] = useState(0);
  const [addfunds, setAddFunds] = useState();
  const [transaction, setTransaction] = useState("");
  const [transactionCurrency, setTransactionCurrency] = useState();
  const [wallet, setWallet] = useState();
  const [connection, setConnection] = useState();
  const [showInfo, setShowInfo] = useState();

  useEffect(() => {
    var info = localStorage.getItem('showinfo');
    setShowInfo(info);
  },[])

  useEffect(() => {
    if (!config)
      return;
    const newConnection = new HubConnectionBuilder()
      .withUrl(config.WebHubURL)
      .withAutomaticReconnect([0,5000,10000,30000,null])
      .build();
    newConnection.on('CoinUpdate', (_coins) => {
      if (_coins)
      {
        const newCoins = _coins.map((coin) => {
          return new Coin(coin.image, coin.name, coin.symbol, coin.current_price, coin.price_change_percentage_1h_in_currency, coin.price_change_percentage_24h_in_currency, coin.sparkline_in_7d)
        });
        setCoins(newCoins);
      }
    })
    newConnection
      .start()
      .then(result => {
        newConnection.invoke("JoinCryptoUpdateGroup")
        setConnection(newConnection);
      })
      .catch(err => console.log(err))

    const tmp = localStorage.getItem('wallet');
    if (tmp)
      setWallet(JSON.parse(tmp));
    else
    {
      const tmpwallet = new Wallet();
      setWallet(tmpwallet);
      localStorage.setItem('wallet',JSON.stringify(tmpwallet));
    }
  },[config])

  // Transaction functions

  const AddCash = (amount) => {
    var tmp = wallet;
    tmp.initialCash += amount;
    tmp.currentCash += amount;
    localStorage.setItem('wallet', JSON.stringify(tmp));
    setWallet(tmp);
  }

  const SellCurrency = (name, amount) => {
    var tmp = wallet;
    var res = tmp.assets.find(x => x.name === name);
    if (!res || res.amount < amount)
      return;
    var coin = coins.find(x => x.name === name);
    var value = coin.price * amount;
    var index = tmp.assets.indexOf(res);
    tmp.assets[index].amount -= amount;
    tmp.currentCash += value;
    tmp.transactionHistory.push(name, 'Sell', amount, coin.price, Date.parse(Date.now()));
    tmp.profit += value - tmp.assets[index].avgPurchasePrice * amount;
    if (tmp.assets[index].amount === 0)
      tmp.assets = tmp.assets.filter(x => x.name !== name);
    localStorage.setItem('wallet', JSON.stringify(tmp));
    setWallet(tmp);
    setTransaction('');
    setTransactionCurrency(null);
    setCoins([].concat(coins));
    setOrder(order + 0);
  }

  const BuyCurrency = (name, amount) => {
    var tmp = wallet;
    var res = tmp.assets.find(x => x.name === name);
    var value = transactionCurrency.price * amount;
    if (tmp.currentCash < value)
      return;
    if (!res)
    {
      tmp.assets.push(new Asset(name, amount, transactionCurrency.price));
    }
    else
    {
      var index = tmp.assets.indexOf(res);
      tmp.assets[index].amount += amount;
      tmp.assets[index].avgPurchasePrice = CalculateNewAvgPrice(name, transactionCurrency.price)
    }
    tmp.currentCash -= value;
    tmp.transactionHistory.push(new Transaction(name, 'Buy', amount, transactionCurrency.price, Date.parse(Date.now())));
    localStorage.setItem('wallet', JSON.stringify(tmp));
    setWallet(tmp);
    setTransaction('');
    setTransactionCurrency(null);
    setCoins([].concat(coins));
  }

  const CalculateNewAvgPrice = (name, latestprice) => {
    var tmp = wallet;
    var history = tmp.transactionHistory.filter(x => x.name === name);
    var sum = history.reduce((acc,a) => acc + a.price, latestprice);
    return sum / (history.length+1);
  }

  const BeginTransaction = (type, name) => {
    setTransaction(type);
    setTransactionCurrency(coins.find(x => x.name === name));
  }

  const GetAmountOwned = (name) => {
    if (wallet.assets.some(x => x.name === name))
      return wallet.assets.find(x => x.name === name).amount;
    else 
      return 0;
  }

  const SetAddFunds = (state) => {
    setAddFunds(state);
  }

  const ChangeChartIndex = (i) => {
    if (i >= 0 && i < coins.length)
    {
      setChartIndex(i);
    }
  }

  const ChangeFilter = (phrase) => {
    if (!phrase)
      setFilter("");
    else
      setFilter(phrase);
  }

  const ChangeOrder = (_order) => {
    setOrder(_order);
  }

  const ShowInfo = (value) => {
    setShowInfo(value);
    localStorage.setItem('showinfo', value);
  }

  const value = {
    state: {coins, chartIndex, transaction, transactionCurrency, wallet, connection, addfunds, showInfo, filter, order},
    actions: {BeginTransaction, BuyCurrency, SellCurrency, AddCash, GetAmountOwned, SetAddFunds, ChangeChartIndex, ShowInfo, ChangeFilter, ChangeOrder}
  }
  return (
    <CoinContext.Provider value={value}>
        {children}
    </CoinContext.Provider>
  )
}