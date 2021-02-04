import React, { Fragment, useState, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserInfoTable from '@src/components/UserInfoTable';
import UserListTable from '@src/components/UserListTable';
import Layout from '@src/components/Layout';
import SectionHeader from '@src/components/SectionHeader';
import { useUser } from '@src/hooks';

const Home: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const { userList: users } = useUser();

  const styles = makeStyles((theme) => ({
    divider: {
      backgroundColor: 'transparent',
      border: '0.0625rem dotted #e1e1e1',
      borderBottom: 'none'
    },
    formGroup: {
      maxWidth: theme.spacing(64)
    },
    formControlLabel: {
      color: '#777',
      display: 'inline-block',
      fontSize: '0.875rem',
      fontStyle: 'italic'
    }
  }))();

  const toggleAdminView = (): void => {
    setIsAdminView(!isAdminView);
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      toggleAdminView();
    }
  };

  const entries = users.map((user, index) => (
    <Fragment key={user._id}>
      <UserInfoTable user={user} />
      {index !== users.indexOf(users[users.length - 1]) && (
        <Divider className={styles.divider} />
      )}
    </Fragment>
  ));

  return (
    <Layout>
      <SectionHeader
        title="Current Users"
        description={`${entries.length} user${entries.length !== 1 ? 's' : ''} found.`}
      />
      {entries.length > 0 ? (
        <>
          <FormGroup classes={{ root: styles.formGroup }}>
            <FormControlLabel
              classes={{ root: styles.formControlLabel }}
              control={
                <Switch
                  checked={isAdminView}
                  onChange={toggleAdminView}
                  onKeyPress={handleKeyPress}
                  value="view"
                  color="secondary"
                />
              }
              label={`Admin mode ${isAdminView ? 'enabled' : 'disabled'}.`}
            />
          </FormGroup>
          {isAdminView ? entries : <UserListTable />}
        </>
      ) : (
        <Typography>
          Let&apos;s get things started: <Link to="/new-user">click here</Link> to create
          a user.
        </Typography>
      )}
    </Layout>
  );
};

export default Home;
