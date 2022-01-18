import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useConfig } from '../Config/use'
import { L10NContext } from './context'

export const L10NProvider = ({children}) => {
  const [language, setLanguage] = useState();
  const [resources, setResources] = useState();
  const { state: {config}, actions: {GetDefaultLanguage}} = useConfig();

  useEffect(() => {
    if (config)
    {
      var lang = GetLanguage();
      GetResources(lang);
    }
  },[config])

  const GetResources = (lang) => {
    axios({
      method: 'get',
      url: './' + lang + '.json',
      responseType: 'json'
    })
    .then(res => { setResources(res.data); 
                   localStorage.setItem('langresource', JSON.stringify(res.data))
                 })
    .catch(err => { console.log(err); setResources(JSON.parse(localStorage.getItem('resources')));})
  }

  const GetLanguage = () => {
    var lang = localStorage.getItem('language');
    if (!lang)
    {
      if (config)
      {
        lang = GetDefaultLanguage();
        if (!lang)
        {
          lang = 'en-US'
        }
        setLanguage(lang);
      }
    }
    else
      setLanguage(lang);
    return lang;
  }

  const ChangeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
    GetResources(lang);
  }

  const t = (key) => {
    if (!language || !resources)
      return;
    const splitted = key.split('.');
    var result;
    if (splitted.length > 0)
    {
      try {
        for (var i = 0; i < splitted.length; i++) {
          if (i === 0)
            result = resources[splitted[i]];
          else
            result = result[splitted[i]];
        }
        return result;
      }
      catch(error) {
        console.log(error)
      }
    }
    return null;
  }

  const value = {
    state: {language},
    actions: {t, ChangeLanguage}
  }
  return (
    <L10NContext.Provider value={value}>
        {children}
    </L10NContext.Provider>
  )
}