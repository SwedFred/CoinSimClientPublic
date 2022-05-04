import { CircularProgress } from '@mui/material';
import React from 'react'
import { useCoins } from './Contexts/Coingecko/use';
import { ExchangePage } from './Pages/exchange';
import { LandingPage } from './Pages/landing';

export const App = () => {
  const {state: {showInfo}} = useCoins();

  if (showInfo === true)
    return ( <LandingPage /> )
  else if (showInfo === false )
    return ( <ExchangePage /> )
  else
   return <CircularProgress />
}