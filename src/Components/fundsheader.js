import { Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCoins } from '../Contexts/Coingecko/use'
import { DropDownMenu } from './dropdownmenu';
import { GetTruncatedAmount } from '../Helpers/truncation'
import { useL10N } from '../Contexts/l10n/use';
import { useConfig } from '../Contexts/Config/use';

export const FundsHeader = () => {
  const { state: {wallet}} = useCoins();
  const { actions: {t}} = useL10N();
  const { state: {currency}, actions: {ChangeCurrency}} = useConfig();
  const matches = useMediaQuery('(min-width:600px)');

  if(!wallet)
    return (<span/>)
  else
  return (
      <div style={classes.wrapper(matches)}>
        <Typography
          sx={classes.label}>
          {t('fundsheader.funds')}
        </Typography>
        <div style={classes.container}>
          <Typography
            align='left'
            sx={classes.txt(0)}
          >
            { GetTruncatedAmount(wallet.currentCash.toString(),3) + ' ' + currency }
          </Typography>
        </div>
        <Typography
          sx={classes.label}
        >
          { t(wallet.profit >= 0 ? 'fundsheader.profit' : 'fundsheader.loss')}
        </Typography>
        <div style={classes.container}>
          <Typography
            align='left'
            sx={classes.txt(wallet.profit)}
          >
            { GetTruncatedAmount(wallet.profit, 3) + ' ' + currency}
          </Typography>
        </div>
        <div style={classes.buttoncontainer}>
          <DropDownMenu />
        </div>
    </div>
  )
}

const classes = {
  wrapper: (big) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: big ? '2.5rem' : '1.5rem',
    alignItems: 'center',
    backgroundColor: '#cccccc'
  }),
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '5px',
    paddingRight: '5px',
    marginLeft: '8px',
    marginRight: '8px',
    backgroundColor: '#dddede',
    width: '35%',
    flex: 'auto',
    justifyContent: 'center'
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 'auto',
    justifyContent: 'center'
  },
  label: {
    marginLeft: '4px',
    fontSize: '2vh'
  },
  txt: profit => ({
    fontSize: '2vh',
    color: profit > 0 ? 'green' : profit < 0 ? 'red' : '#333'
})
}