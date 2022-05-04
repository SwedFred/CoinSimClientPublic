import React from 'react'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { CoinLabel } from './coinlabel'
import { ValueText } from './valuetext'
import { TransactionButton } from './transactionbutton';
import { useCoins } from '../Contexts/Coingecko/use';
import { GetTruncatedAmount } from '../Helpers/truncation';

export const CoinTableBody = ({data, page, pagesize}) => {
  const {actions: {BeginTransaction, GetAmountOwned, ChangeChartIndex}} = useCoins();

  const OnTransaction = (type, name) => {
    BeginTransaction(type, name);
  }

  return (
    <TableBody>
      { data ? data.map((row,i) => (
        <TableRow key={row.name} onClick={(e) => ChangeChartIndex(i)}>
          <TableCell>{<p style={classes.text}>{(page * pagesize +i)+1}</p>}</TableCell>
          <TableCell>{<CoinLabel url={row.image} name={row.name} tiny={true}/>}</TableCell>
          <TableCell>{<p style={classes.text}>{row.symbol}</p>}</TableCell>
          <TableCell>{<p style={classes.text}>{row.price + "$"}</p>}</TableCell>
          <TableCell>{<ValueText value={GetTruncatedAmount(row.pricechange1h, 5)} tiny={true}/>}</TableCell>
          <TableCell>{<ValueText value={GetTruncatedAmount(row.pricechange1d, 5)} tiny={true}/>}</TableCell>
          <TableCell><TransactionButton type={'buy'} callback={() => OnTransaction('Buy', row.name)}/></TableCell>
          <TableCell>{ GetAmountOwned(row.name) > 0 
                      ? <TransactionButton type={'sell'} callback={() => OnTransaction('Sell', row.name)}/>
                      : <span/>
                     }
          </TableCell>
        </TableRow>
      ))
      : <span/>
      }
    </TableBody>
  )
}

const classes = {
  text: {
    fontSize: 'x-small',
    padding: 0,
    margin: 0
  }
}