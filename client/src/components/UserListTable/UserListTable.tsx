import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useUser } from '@src/hooks';

const UserListTable: React.FC = () => {
  const { userList: users } = useUser();

  const styles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      width: '100%'
    },
    table: {
      minWidth: 650
    }
  }))();

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
            <TableRow key={user.id}>
              <TableCell scope="row">{user.username}</TableCell>
              <TableCell align="right">{user.id}</TableCell>
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
