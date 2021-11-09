import { useState, useEffect } from 'react';

import { Button, IconButton } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';

import Api from '@src/api';
import femaleIcon from '@src/assets/female-icon.png';
import maleIcon from '@src/assets/male-icon.png';
import UserForm from '@src/components/UserForm';
import { MOBILE_QUERY } from '@src/constants';
import { User } from '@src/context';
import { useModal, useToast, useUser } from '@src/hooks';
import { UserService } from '@src/services';
import './UserInfoTable.scss';

interface UserInfoTableProps {
  user: User;
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ user }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { closeModal, openModal } = useModal();
  const { openToast } = useToast();
  const { getUsers } = useUser();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const source = Api.source();

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { address, firstName, gender, lastName, username, _id: userId } = user;

  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
  };

  const deleteUser = async (): Promise<void> => {
    try {
      await UserService.deleteUser(userId, source);
      await getUsers();
      openToast({ variant: 'success', message: 'User successfully deleted.' });
    } catch (err) {
      if (!Api.isCancel(err as Record<string, unknown>)) {
        openToast({ variant: 'error', message: 'There was an error deleting the user.' });
      }
    }
  };

  const openDeleteModal = (): void => {
    openModal({
      title: 'Are you sure?',
      message: 'You are about to delete a user. This action cannot be undone.',
      action: async () => {
        await deleteUser();
        closeModal();
      }
    });
  };

  return !isEditMode ? (
    <div className="table-entry">
      {!isMobile && (
        <img
          className="user-icon"
          alt={`${username} user icon`}
          src={gender === 'male' || gender === 'other' ? maleIcon : femaleIcon}
        />
      )}
      <table className="user-info">
        <tbody>
          <tr>
            <th colSpan={2}>
              {firstName} {lastName}
            </th>
          </tr>
          <tr>
            <td>Username</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>ID #</td>
            <td>{userId}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{gender.charAt(0).toUpperCase() + gender.slice(1)}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
        </tbody>
      </table>
      <div className="actions">
        <IconButton
          aria-label={`Delete entry for ${firstName} ${lastName}`}
          onClick={openDeleteModal}
          color="inherit"
          classes={{ colorInherit: 'delete-icon' }}
        >
          <TrashIcon />
        </IconButton>
        <IconButton
          aria-label={`Edit entry for ${firstName} ${lastName}`}
          onClick={toggleEditMode}
          color="inherit"
          classes={{ colorInherit: 'edit-icon' }}
        >
          <EditIcon />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className="update-user-form">
      <UserForm variant="update" initialValues={user} callback={toggleEditMode} />
      <Button
        onClick={toggleEditMode}
        color="secondary"
        variant="outlined"
        className="cancel-button"
      >
        Cancel
      </Button>
    </div>
  );
};

export default UserInfoTable;
