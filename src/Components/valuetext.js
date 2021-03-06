import React from 'react'

//  Text used to represent gain/loss/neutral by coloring it
export const ValueText = ({value, tiny}) => {
  return (
    <p style={classes.text(value, tiny)}>{value + "%"}</p>
  )
}

const classes =  {
  text: (value, tiny) => ({
    color: value > 0 ? 'green' : value < 0 ? 'red' : 'black',
    fontSize: tiny ? 'x-small' : 'small',
    margin: '2px'
  })
}