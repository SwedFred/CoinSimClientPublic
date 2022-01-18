import {useContext} from 'react'
import { CoinContext } from './context'

export const useCoins = () => {
  return useContext(CoinContext);
}