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

import type { vaccination } from '../overview/view/overview-analytics-view';

const StyledTableHeadCell = styled(TableCell)(() => ({
  backgroundColor: '#b3e0ff',
  color: '#333',
  fontWeight: 'bold',
  padding: '12px 16px',
  fontSize: '1rem',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#e6f7ff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
}));

export default function VaccinationTable({ vaccinationData }: { vaccinationData: vaccination[] }) {
  const [orderBy, setOrderBy] = useState<keyof vaccination>('vaccinationDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (property: keyof vaccination) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedVaccinationData = [...vaccinationData].sort((a, b) =>
    order === 'asc'
      ? new Date(a[orderBy as 'vaccinationDate']).getTime() -
        new Date(b[orderBy as 'vaccinationDate']).getTime()
      : new Date(b[orderBy as 'vaccinationDate']).getTime() -
        new Date(a[orderBy as 'vaccinationDate']).getTime()
  );

  return (
    <Paper sx={{ padding: 2, marginBottom: 2, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#2e4c76', marginBottom: '20px', fontWeight: 'bold' }}>
        Vaccination Table
      </h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Code</StyledTableHeadCell>
              <StyledTableHeadCell>Base Cost</StyledTableHeadCell>
              <StyledTableHeadCell>
                <TableSortLabel
                  active={orderBy === 'vaccinationDate'}
                  direction={order}
                  onClick={() => handleSort('vaccinationDate')}
                >
                  Date Given
                </TableSortLabel>
              </StyledTableHeadCell>
              {/* <StyledTableHeadCell>Encounter ID</StyledTableHeadCell> */}
              <StyledTableHeadCell>Description</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVaccinationData.length > 0 ? (
              sortedVaccinationData.map((row) => (
                <StyledTableRow key={row.encounterId}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.baseCost}</TableCell>
                  <TableCell>{row.vaccinationDate}</TableCell>
                  {/* <TableCell>{row.encounterId}</TableCell> */}
                  <TableCell>{row.description}</TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No vaccination records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
