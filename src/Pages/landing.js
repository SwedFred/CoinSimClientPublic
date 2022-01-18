import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useCoins } from '../Contexts/Coingecko/use'
import { useL10N } from '../Contexts/l10n/use'
import bitcoin from '../images/Bitcoin.png'

export const LandingPage = () => {
  const {actions: {t}} = useL10N();
  const {actions: {ShowInfo}} = useCoins();

  const handleShowInfo = () => {
    ShowInfo(false);
  }

  return (
    <div style={classes.bgimg(bitcoin)}>
      <div style={classes.container}>
        <Typography
          sx={classes.heading}
        >
          Cryptocurrency Trading Simulator
        </Typography>
        {/* <div style={classes.coincontainer}>
          <Typography
            variant='h2'
            style={classes.coin}
          >
            {t('landing.internetcoin')}
          </Typography>
        </div> */}
        <div style={classes.greetingswrapper}>
          <Typography
            style={classes.greeting}
          >
            {t('landing.greeting1')}
          </Typography>
          <Typography
            style={classes.greeting}
          >
            {t('landing.greeting2')}
          </Typography>
          <Typography
            style={classes.greeting}
          >
            {t('landing.greeting3')}
          </Typography>          
        </div>
        <button style={classes.stickybutton} onClick={handleShowInfo}>
          <Typography
            style={classes.buttontext}
          >
            {t('landing.start')}
          </Typography>
        </button>
      </div>
    </div>
  )
}

const classes = {
  bgimg: coins => ({
    width: '100%',
    minHeight: '100vh',
    maxHeight: '100%',
    background: 'url(' + coins + ')',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }),
  container: {
    width: '100%',
    minHeight: '100vh',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    background: 'linear-gradient(90deg, rgba(252, 70, 107, 0.7) 0%, rgba(63, 94, 251, 0.7) 100%)',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  },
  stickybutton: {
    position: '-webkit-sticky',
    position: 'sticky',
    bottom: '1rem',
    width: '50%',
    maxWidth: '200px',
    height: '100px',
    borderRadius: '15px',
    backgroundColor: 'rgba(63, 94, 251, 1)',
    color: '#f3f3f3',
    marginBottom: '1rem'
  },
  coincontainer: {
    display: 'flex',
    borderRadius: '50%',
    height: '300px',
    width: '300px',
    background: 'linear-gradient(to bottom, #D4AF37 0%, #C5A028 100%)',
    margin: '2rem',
    boxShadow: '0 0 0 10px #D4AF37, 0 0 0 15px #C5A028',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  coin: {
    fontWeight: '500',
    webkitTextStroke: '2px rgb(193 152 21)'
  },
  greetingswrapper: {
    width: '60%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255,255,255,0.7)',
    padding: '0 2rem',
    justifyContent: 'space-between',
    borderRadius: '8px',
    border: '2px solid #f3f3f3'
  },
  greeting: {
    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
    fontFamily: 'Tahoma, serif',
    padding: '1rem 0'
  },
  heading: {
    position: 'relative',
    fontFamily: 'Avenir Next, sans-serif',
    fontWeight: '900',
    fontSize: 'clamp(0.75rem, 5vw, 5rem)',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    letterSpacing: '0.05em',
    display: 'inline-block'
  },
  buttontext: {
    fontSize: '300%'
  }
}