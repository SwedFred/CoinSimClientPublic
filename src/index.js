import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CoinProvider } from './Contexts/Coingecko/provider';
import { ConfigProvider } from './Contexts/Config/provider';
import { L10NProvider } from './Contexts/l10n/provider';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <L10NProvider>
        <CoinProvider>
          <App />
        </CoinProvider>
      </L10NProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
