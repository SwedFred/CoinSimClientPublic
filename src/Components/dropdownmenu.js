import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useCoins } from '../Contexts/Coingecko/use';
import { useL10N } from '../Contexts/l10n/use';

export const DropDownMenu = () => {
  const {actions: {SetAddFunds, ShowInfo}} = useCoins();
  const [anchorEl, setAnchorEl] = useState(null);
  const { actions: {t, ChangeLanguage}} = useL10N();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleAddFunds = () => {
    setAnchorEl(null);
    SetAddFunds(true);
  }

  const handleChangeLanguage = (langCode) => {
    setAnchorEl(null);
    ChangeLanguage(langCode);
  }

  const showInfo = () => {
    ShowInfo(true);
  }

  return (
    <>
      <IconButton edge="end" onClick={handleOpenMenu} sx={{marginRight: '2%'}}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"  
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {setAnchorEl(null)}}
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <MenuItem onClick={() => handleChangeLanguage('sv-SE')} sx={{display: 'block'}}>Swedish</MenuItem>
          <MenuItem onClick={() => handleChangeLanguage('en-US')} sx={{display: 'block'}} divider='true'>English</MenuItem>
          <MenuItem onClick={() => handleAddFunds('funds')} sx={{display: 'block'}} divider='true'>{t('menu.addfunds')}</MenuItem>
          <MenuItem onClick={() => showInfo()} sx={{display: 'block'}}>{t('menu.showinfo')}</MenuItem>
        </div>
      </Menu>
    </>
  )
}