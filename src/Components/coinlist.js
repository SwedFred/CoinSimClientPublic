import React, { useEffect, useState } from 'react'
import { CoinListItem } from './coinlistitem'
import { useCoins } from '../Contexts/Coingecko/use';

export const CoinList = ({coins, callback}) => {
  const {state:{filter, order, wallet}, actions: {BeginTransaction, GetAmountOwned, ChangeChartIndex}} = useCoins();
  const [items, setItems] = useState(null);

  const OnTransaction = (type, name) => {
    BeginTransaction(type, name);
  }

  const OrderCoins = (order, _coins) => {
    if (!_coins)
      return null;
    switch (order) {
      case 1:
        return _coins.sort((a,b) => {if (a.price < b.price) return 1; if (a.price > b.price) return -1; else return 0;})
      case 2:
        return _coins.sort((a,b) => {if (a.price > b.price) return 1; if (a.price < b.price) return -1; else return 0;})
      case 3:
        return _coins.sort((a,b) => {if (a.pricechange1h < b.pricechange1h) return 1; if (a.pricechange1h > b.pricechange1h) return -1; else return 0;})
      case 4:
        return _coins.sort((a,b) => {if (a.pricechange1h > b.pricechange1h) return 1; if (a.pricechange1h < b.pricechange1h) return -1; else return 0;})
      case 5:
        return _coins.sort((a,b) => {if (a.pricechange1d < b.pricechange1d) return 1; if (a.pricechange1d > b.pricechange1d) return -1; else return 0;})
      case 6:
        return _coins.sort((a,b) => {if (a.pricechange1d > b.pricechange1d) return 1; if (a.pricechange1d < b.pricechange1d) return -1; else return 0;})
      case 7:
        return _coins.filter(coin => wallet.assets.find(x => x.name.toLowerCase() === coin.name.toLowerCase()));
      default:
        return _coins;
    }
  }

  useEffect(() => {
    if (coins)
    {
      if (!filter)
        setItems(OrderCoins(order, coins).map((x,i) => { 
          return <CoinListItem 
                  key={i} 
                  coin={x} 
                  position={i} 
                  chartcallback={() => ChangeChartIndex(i)} 
                  buycallback={() => OnTransaction('Buy', x.name)} 
                  sellcallback={() => OnTransaction('Sell', x.name)}
                  amountowned={GetAmountOwned(x.name)}
          />}));
      else
        setItems(OrderCoins(order, coins.filter(coin => coin.name.toLowerCase().includes(filter))).map((x,i) => { 
            return <CoinListItem 
                    key={i} 
                    coin={x} 
                    position={i} 
                    chartcallback={() => ChangeChartIndex(i)} 
                    buycallback={() => OnTransaction('Buy', x.name)} 
                    sellcallback={() => OnTransaction('Sell', x.name)}
                    amountowned={GetAmountOwned(x.name)}
          />}));
    }
  },[coins,filter,order])

  return (
    <div style={classes.listcontainer}>
      <div style={classes.listwrapper}>
        { items ? items : <span/> }
      </div>
    </div>
  )
}

const classes = {
  listwrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    height: '100%',
    flex: '1 0 auto'
  },
  listcontainer: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%',
    overflow: 'auto'
  }
}