import React from 'react'
import { useL10N } from '../Contexts/l10n/use';

export const TransactionButton = ({type, size, callback}) => {
  const {state: {}, actions: {t}} = useL10N();

  return (
    <button 
      style={classes.btn(type, size)}
      onClick={() => callback()}
    >
      {t(`coinslist.${type}`)}
    </button>
  )
}

const classes = {
  btn: (type, size) => ({
    color: 'white',
    backgroundColor: type === 'buy' ? 'green' : 'blue',
    width: size === 'big' ? '50px' : '40px',
    height: size === 'big' ? '40px' : '20px',
    fontSize: size === 'big' ? 'large' : 'xx-small',
    padding: size === 'big' ? '6px 8px' : '3px 4px',
    textTransform: 'none',
    borderRadius: '5px'
  })
}