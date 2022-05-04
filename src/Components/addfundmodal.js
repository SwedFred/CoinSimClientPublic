import React, { useEffect, useState } from 'react'
import { Button, DialogContentText } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useCoins } from '../Contexts/Coingecko/use';
import { useL10N } from '../Contexts/l10n/use';

export const AddFundModal = () => {
  const {state: {addfunds }, actions: {AddCash, SetAddFunds}} = useCoins();
  const {state: {}, actions: {t}} = useL10N();
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAmount(0);
    if (addfunds)
      setOpen(true);
    else
      setOpen(false);
  },[addfunds])

  const handleClose = () => {
    setOpen(false);
    setAmount(0);
    SetAddFunds(false);
  };

  const handleChange = (e) => {
    const tmp = parseInt(e.target.value);
    if (isNaN(tmp))
      setAmount(0);
    else
    {
      setAmount(tmp);
      e.target.value = tmp;
    }
  }

  const handleAddFunds = () => {
    if (amount > 0)
      AddCash(amount);
    setAmount(0);
    SetAddFunds(false);
  }

  return (
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth='sm'
        fullWidth={true}
        PaperProps={{sx: {border: '1px solid black'}}}
        >
        <DialogTitle>Add funds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { t('addfunds.explanation1') + String(amount) + t('addfunds.explanation2') }
          </DialogContentText>
          <TextField
          label="$"
          type='number'
          onChange={e => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>{t('addfunds.cancelbutton')}</Button>
          <Button onClick={() => handleAddFunds()}>{t('addfunds.addbutton')}</Button>
        </DialogActions>
      </Dialog>
  )
}