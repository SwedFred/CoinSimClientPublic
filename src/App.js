import React, { useEffect, useState } from 'react'
import { useCoins } from './Contexts/Coingecko/use';
import { ExchangePage } from './Pages/exchange';
import { LandingPage } from './Pages/landing';

export const App = () => {
  const {state: {showInfo}} = useCoins();
  const [info, setInfo] = useState();

  useEffect(() => {
    if (showInfo)
      setInfo(showInfo);
    else
    {
      var si = localStorage.getItem('showinfo');
      setInfo(si)
    }
  },[showInfo])

  if (showInfo)
  {
    return (
      <LandingPage />
    )
  }
  else
  {
    return (
      <ExchangePage />
    )
  }
}