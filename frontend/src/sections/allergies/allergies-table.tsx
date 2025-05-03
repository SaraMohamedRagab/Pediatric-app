import React, { useState } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';

import type { Allergy } from '../overview/view/overview-analytics-view';

const StyledTableHeadCell = styled(TableCell)(() => ({
  backgroundColor: '#d8d0f2',
  color: '#333',
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '12px',
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f3f0fa',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
  '&:hover': {
    backgroundColor: '#ece4ff',
  },
}));

export default function AllergyTable({ allergyData }: { allergyData: Allergy[] }) {
  const [orderBy, setOrderBy] = useState<keyof Allergy>('description');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (property: keyof Allergy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...allergyData].sort((a, b) =>
    order === 'asc'
      ? String(a[orderBy]).localeCompare(String(b[orderBy]))
      : String(b[orderBy]).localeCompare(String(a[orderBy]))
  );

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: '20px 0' }}>
      <h3 style={{ color: '#5a4b81', marginBottom: '16px' }}>Allergy Table</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={order}
                  onClick={() => handleSort('description')}
                >
                  Allergy Name
                </TableSortLabel>
              </StyledTableHeadCell>
              <StyledTableHeadCell>Code</StyledTableHeadCell>
              <StyledTableHeadCell>Category</StyledTableHeadCell>
              <StyledTableHeadCell>Type</StyledTableHeadCell>
              <StyledTableHeadCell>System</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.system}</TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No allergy records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
