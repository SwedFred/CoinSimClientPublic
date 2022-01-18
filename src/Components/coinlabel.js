import React from 'react'

export const CoinLabel = ({url, name, tiny}) => {

  return (
    <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
      <img style={{width: '16px', height: '16px', marginRight: '4px'}} src={url} alt={name}/>
      <p style={classes.text(name.length, tiny)}>{name}</p>
    </div>
  )
}

const classes = {
  text: (length, tiny) => ({
    fontSize: (length >= 15 || tiny) ? 'x-small' : 'small',
  })
}