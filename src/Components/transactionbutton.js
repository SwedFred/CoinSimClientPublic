import { Button } from '@mui/material';
import React from 'react'

export const TransactionButton = ({type, size, callback}) => {

  return (
    <button 
      style={classes.btn(type, size)}
      onClick={() => callback()}
    >
      {type}
    </button>
  )
}

const classes = {
  btn: (type, size) => ({
    color: 'white',
    backgroundColor: type === 'Buy' ? 'green' : 'blue',
    width: size === 'big' ? '50px' : '40px',
    height: size === 'big' ? '40px' : '20px',
    fontSize: size === 'big' ? 'large' : 'xx-small',
    padding: size === 'big' ? '6px 8px' : '3px 4px',
    textTransform: 'none',
    borderRadius: '5px'
  })
}