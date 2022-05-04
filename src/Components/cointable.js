import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { CoinTableBody } from './cointablebody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination'
import { TablePaginationNav } from './tablepaginationnav';

//  Represents the crypto coins as a table for desktop view
export const CoinTable = (data, callback) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 400, maxWidth: '100%', height: '90vh'}} size="small">
        <TableHead>
          <TableRow>
            <TableCell style={classes.text}>#</TableCell>
            <TableCell style={classes.text}>Coin</TableCell>
            <TableCell style={classes.text}>Symbol</TableCell>
            <TableCell style={classes.text}>Price</TableCell>
            <TableCell style={classes.text}>1h</TableCell>
            <TableCell style={classes.text}>24h</TableCell>
            <TableCell style={classes.text}></TableCell>
          </TableRow>
        </TableHead>
        <CoinTableBody 
          data={data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} 
          page={page} 
          pagesize={rowsPerPage}
          />
        <TableFooter>
          <TableRow>
            <TablePagination 
              rowsPerPageOptions={[10, 15, 20]}
              colSpan={7}
              count={data.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Currencies per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationNav}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

const classes = {
  text:{
    fontSize: 'small'
  }
}

