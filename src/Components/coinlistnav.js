import { Autocomplete, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useCoins } from '../Contexts/Coingecko/use'
import { useL10N } from '../Contexts/l10n/use'

export const CoinListNav = ({coins, callback}) => {
  const { actions: {ChangeFilter}} = useCoins();
  const { actions: {t}} = useL10N();
  const [selected, setSelected] = useState(null);

  const HandleChanges = (e) => {
    setSelected(e.target.value);
    callback(e.target.value);
  }

  const HandleSearch = (e) => {
    ChangeFilter(e.target.value);
  }  

  return (
      <FormControl variant="standard" sx={classes.container}>
        <InputLabel style={classes.label} id="select-label">{t('coinslist.filterlabel')}</InputLabel>
        <Select
          labelId="select-label"
          id="select-id"
          value={selected}
          sx={classes.select}
          onChange={HandleChanges}
          autoWidth={true}
        >
          <MenuItem sx={classes.select} value={1}>{t('coinslist.firstitem')}</MenuItem>
          <MenuItem sx={classes.select} value={2}>{t('coinslist.seconditem')}</MenuItem>
          <MenuItem sx={classes.select} value={3}>{t('coinslist.thirditem')}</MenuItem>
          <MenuItem sx={classes.select} value={4}>{t('coinslist.fourthitem')}</MenuItem>
          <MenuItem sx={classes.select} value={5}>{t('coinslist.fifthitem')}</MenuItem>
          <MenuItem sx={classes.select} value={6}>{t('coinslist.sixthitem')}</MenuItem>
          <MenuItem sx={classes.select} value={7}>{t('coinslist.seventhitem')}</MenuItem>
        </Select>
        <Autocomplete 
              id="searchfieldparams"
              onChange={(e) => HandleSearch(e, true)}
              freeSolo={true}
              sx={classes.autoflex}
              noresulttext={t('coinslist.inputnohits')|| "nope"}
              options={coins ? coins.map(x => x.name) : []}
              renderInput={(params) => (
                <TextField  
                {...params}
                id="locationtext"
                autoComplete="off"
                label={t('coinslist.inputplaceholder') || "Sök"}
                variant="outlined"
                size="small"
                onChange={HandleSearch}
                onKeyDown={e => { if (e.key === "Enter" && e.target.value) 
                {
                  HandleSearch(e);
                }}}
                />
              )}
            />
      </FormControl>
  )
}

const classes = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'black'
  },
  select: {
    fontSize: 'small',
    margin: '2px',
    padding: '0',
    flex: '0.5 0.5 auto'
  },
  autoflex: {
    flex: '0.5 0.5 auto'
  }
}