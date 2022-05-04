import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCoins } from '../Contexts/Coingecko/use'
import { useL10N } from '../Contexts/l10n/use';
import { isDecimal } from '../Helpers/isdecimal';

//  Dialog used for both buying and selling currency
//  TODO: Fix the hardcoded $ sign if we implement multiple fiat currencies
export const TransactionDialog = () => {
  const {state: { transaction, transactionCurrency}, actions: {BuyCurrency, SellCurrency, BeginTransaction, GetAmountOwned}} = useCoins();
  const {state: {}, actions: {t}} = useL10N();
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  useEffect(() => {
    if (transaction)
      setOpen(true);
    else
      setOpen(false);
  },[transaction])

  const handleClose = () => {
    setOpen(false);
    setAmount(0);
    BeginTransaction('', null);
  };

  const handleChange = (e) => {
    if (transaction === 'Buy')
    {
      const num = parseInt(e.currentTarget.value);
      if(isNaN(num)) {
        if (e.currentTarget.value.length > 0)
          return;
        setAmount(0);
      }
      else {
        e.currentTarget.value = num;
        setAmount(num);
      }
    }
    else if (transaction === 'Sell')
    {
      if (!e.currentTarget.value) {
        setAmount(0);
        return;
      }
      else {
        if (!isDecimal(e.currentTarget.value))
        {
          e.currentTarget.value = e.currentTarget.value.substring(0,e.currentTarget.value.length-1);
          return;
        }

        var cc = e.currentTarget.value.charCodeAt(e.currentTarget.value.length-1);
        if (cc !== 45 && cc !== 46 )
          e.currentTarget.value = clamp(e.currentTarget.value, 0, GetAmountOwned(transactionCurrency.name));
        setAmount(e.currentTarget.value);
      }
    }
  }

  const onTransaction = () => {
    if (!transactionCurrency)
      return;
    if (transaction === 'Buy')
    {
      BuyCurrency(transactionCurrency.name, amount / transactionCurrency.price);
      setAmount(0);
      setOpen(false);
    }
    else if (transaction === 'Sell')
    {
      var float = parseFloat(amount);
      if (isNaN(float))
        return;
      SellCurrency(transactionCurrency.name, amount);
      setAmount(0);
      setOpen(false);
    }
    
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth='sm'
      fullWidth={true}
      PaperProps={{sx: {border: '1px solid black'}}}
    >
      <DialogTitle>{ transactionCurrency ? GetAmountOwned(transactionCurrency.name) + ' ' + transactionCurrency.name + ' owned' : ''}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            transaction === 'Buy' ?
              t('transaction.buying1') + amount + t('transaction.buying2') + amount / transactionCurrency.price + t('transaction.buying3') + transactionCurrency.name
            : transaction === 'Sell' ?
            t('transaction.selling1') + amount + t('transaction.selling2') + transactionCurrency.name + t('transaction.selling3') + amount * transactionCurrency.price + ' $'
            : ''
          }
        </DialogContentText>
        <TextField 
        label="$"
        type='number'
        onChange={e => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => onTransaction()}>{transaction}</Button>
      </DialogActions>
    </Dialog>
  )
}