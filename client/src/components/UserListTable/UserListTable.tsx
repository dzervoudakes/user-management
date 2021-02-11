import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { useUser } from '@src/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    overflowX: 'auto',
    width: '100%'
  },
  table: {
    minWidth: 650
  }
}));

const UserListTable: React.FC = () => {
  const { userList: users } = useUser();
  const styles = useStyles();

  return (
    <Paper className={styles.root}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">ID #</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell scope="row">{user.username}</TableCell>
              <TableCell align="right">{user._id}</TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.gender}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserListTable;
