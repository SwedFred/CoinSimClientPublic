import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ConfigContext } from './context'

export const ConfigProvider = ({children}) => {
  const [config, setConfig] = useState();
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    GetConfig();
  },[])

  const GetDefaultLanguage = () => {
    if (config) {
      return config.defaultLanguage;
    }
  }

  const ChangeCurrency = (value) => {
    setCurrency(value);
  }

  const GetConfig = async () => {
    await axios({
      method: 'get',
      url: './config.json',
      responseType: 'json'
    })
    .then(res => setConfig(res.data))
    .catch(err => console.log(err))
  }


  const value = {
    state: { config, currency },
    actions: { GetDefaultLanguage, ChangeCurrency }
  }
  return (
    <ConfigContext.Provider value={value}>
        {children}
    </ConfigContext.Provider>
  )
}