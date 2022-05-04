import React from 'react'
import { ListItem, Paper } from '@mui/material'
import { useCoins } from '../Contexts/Coingecko/use'
import { CoinLabel } from './coinlabel'
import { TransactionButton } from './transactionbutton'
import { useL10N } from '../Contexts/l10n/use'
import { ValueText } from './valuetext'
import { GetTruncatedAmount } from '../Helpers/truncation'

export const CoinListItem = ({coin, position, chartcallback, buycallback, sellcallback, amountowned}) => {
  const {actions: {t}} = useL10N();

  return (
    <ListItem style={classes.wrapper}>
      <Paper sx={classes.paper} onClick={(e) => chartcallback()}>
        <div style={classes.namewrapper}>
          <p style={classes.text}>#{position}</p>
          <div style={classes.coinwrapper}>
            <CoinLabel url={coin.image} name={coin.name} tiny={true}/>
            <div style={{marginLeft: '4px'}}>({coin.symbol})</div>
          </div>
          <div style={classes.actionwrapper}>
            <TransactionButton type={'buy'} size={'small'} callback={() => buycallback()}/>
            { amountowned > 0 ? <TransactionButton type={'sell'} size={'small'} callback={() => sellcallback()}/> : <span style={{width: '40px'}}/>}
          </div>
        </div>
        <div style={classes.valuecontainer}>
          <div style={classes.valuewrapper}>
            <div style={classes.listitemtextwrapper}>
              <p style={classes.text}>{t('coinsitem.price')}</p>
            </div>
            <div style={classes.listitemtextwrapper}>
              <p style={classes.text}>{t('coinsitem.pricechange1h')}</p>
            </div>
            <div style={classes.listitemtextwrapper}>
              <p style={classes.text}>{t('coinsitem.pricechange1d')}</p>
            </div>
          </div>
            <div style={classes.valuewrapper}>
              <div style={classes.listitemtextwrapper}>
                <p style={classes.text}>{coin.price}$</p>
              </div>
              <div style={classes.listitemtextwrapper}>
                <ValueText value={GetTruncatedAmount(coin.pricechange1h, 5)} />
              </div>
              <div style={classes.listitemtextwrapper}>
              <ValueText value={GetTruncatedAmount(coin.pricechange1d, 5)} />
              </div>
            </div>
        </div>
      </Paper>
    </ListItem>
  )
}

const classes = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  namewrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: '1.5rem',
    margin: '4px',
    justifyContent:'space-between'
  },
  coinwrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  valuecontainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  valuewrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    height: '1.2rem'
  },
  actionwrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  listitemtextwrapper: {
    display: 'flex',
    width: '33%',
    alignItems: 'center'
  },
  text:{
    fontSize: 'x-small',
    margin: '2px'
  },
  paper: {
    width: '100%'
  }
}