import {useContext} from 'react'
import { L10NContext } from './context'

export const useL10N = () => {
  return useContext(L10NContext);
}