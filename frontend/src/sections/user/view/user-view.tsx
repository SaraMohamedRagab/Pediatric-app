import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    fetch('https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/patients')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => console.error('API Error:', err));
  }, []);

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });
  useEffect(() => {}, [dataFiltered]);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      {/* Wrapper with Heading */}
      <Box textAlign="center" my={4}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            background: 'linear-gradient(45deg, #1e88e5, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
            letterSpacing: '1.5px',
            animation: 'fadeIn 1s ease-in-out',
          }}
        >
          <Iconify icon="mdi:account-group" width={50} height={50} /> {/* User group icon */}
          Pediatrician Home
        </Typography>
      </Box>

      {/* Centered Table Container */}
      <Box display="flex" justifyContent="center">
        <Card sx={{ maxWidth: 900, width: '100%' }}>
          {' '}
          {/* Adjust maxWidth as needed */}
          {/* <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Typography variant="h4">Users</Typography>
            <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
              New user
            </Button>
          </Box> */}
          <UserTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 700 }}>
                {' '}
                {/* Adjust width for a smaller table */}
                <UserTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={_users.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      _users.map((user) => user.id)
                    )
                  }
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'age', label: 'Age' },
                    { id: 'patientId', label: 'Patient ID' },
                    // { id: 'isVerified', label: 'Verified', align: 'center' },
                    // { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onClick={() => table.handleRowClick(row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            component="div"
            page={table.page}
            count={_users.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Box>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const handleRowClick = useCallback(
    (row: UserProps) => {
      localStorage.setItem('selectedPatientId', row.patientId);
      localStorage.setItem('selectedPatientName', row.firstName);
      localStorage.setItem('selectedPatientAge', row.age.toString());
      localStorage.setItem('selectedPatientGender', row.gender);
      navigate('/dashboard');
    },
    [navigate]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
    handleRowClick,
  };
}
