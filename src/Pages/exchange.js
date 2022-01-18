import { CircularProgress, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AddFundModal } from '../Components/addfundmodal';
import { Chart } from '../Components/chart';
import { CoinTable } from '../Components/cointable'
import { CoinList } from '../Components/coinlist'
import { FundsHeader } from '../Components/fundsheader';
import { TransactionDialog } from '../Components/transactiondialog';
import { useCoins } from '../Contexts/Coingecko/use'
import { CoinListNav } from '../Components/coinlistnav';

export const ExchangePage = () => {
  const { state: {coins, chartIndex}, actions: {ChangeOrder}} = useCoins();
  const matches = useMediaQuery('(min-width:600px)');

  const HandleCallback = (value) => {
    ChangeOrder(value);
  }

  if (matches)
  {
    return (
      <div>
        <div style={classes.header}>
          <FundsHeader />
        </div>
        <div style={classes.container}>
          <div style={classes.chartholder}>
            <Chart size={matches ? 'big' : 'small'} name={ coins ? coins[chartIndex].name : null } dataset={coins ? coins[chartIndex].sparkline.price : null } />
          </div>
          { coins ? <CoinTable data={coins} /> : <CircularProgress sx={{color: 'blueviolet'}}/> }
        </div>
        <div style={{width: '50%', display: 'inline'}}>
          <TransactionDialog />
          <AddFundModal />
        </div>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <div style={classes.header}>
          <FundsHeader />
          <Chart size={matches ? 'big' : 'small'} name={ coins ? coins[chartIndex].name : null } dataset={coins ? coins[chartIndex].sparkline.price : null } />
          { coins ? <CoinListNav coins={coins} callback={HandleCallback}/> : <span/> }
        </div>
        { coins 
          ? <CoinList coins={coins} />
          : <CircularProgress sx={{color: 'blueviolet'}}/> }
        <div style={{width: '50%', display: 'inline'}}>
          <TransactionDialog />
          <AddFundModal />
        </div>
      </div>
    )
  }
}

const classes = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'sticky',
    top: '0',
    zIndex: 99,
    backgroundColor: 'white'
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  chartholder:{
    display: 'flex',
    width: '100%',
    justifyContent: 'start',
    alignItems: 'start',
    position: 'sticky'
  }
}