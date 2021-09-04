/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable react/display-name */
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Toast from '@src/components/Toast';
import { ToastProvider, Gender } from '@src/context';
import { UserService } from '@src/services';
import UserForm, { UserFormProps } from '..';

const MockSelect: React.FC = (props) => <select {...props} />;
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Record<string, unknown>),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('uuid', () => ({
  v4: () => '12345'
}));

jest.mock('@material-ui/core/Select', () => (props: Record<string, unknown>) => (
  <MockSelect {...props} />
));

jest.mock('axios');
jest.mock('@src/services/UserService');

describe('UserForm', () => {
  const source = undefined;
  const payload = {
    firstName: 'Eli',
    lastName: 'Manning',
    username: 'nyg10',
    address: '1925 Giants Drive',
    gender: 'male' as Gender
  };
  const TestComponent: React.FC<UserFormProps> = (props) => (
    <MemoryRouter>
      <ToastProvider>
        <UserForm {...props} />
        <Toast />
      </ToastProvider>
    </MemoryRouter>
  );

  it('renders', () => {
    render(<TestComponent />);

    // MUI form fields create an odd structure that doesn't work with 'getByLabelText'.
    // Furthermore, MUI creates multiple DOM nodes with the same text in it... <Sigh />
    expect(screen.getAllByText('First Name').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Last Name').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Username').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Address').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Gender').length).toBeGreaterThan(0);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits user responses and creates a new user', async () => {
    const spy = jest.spyOn(UserService, 'createUser');
    const { container } = render(<TestComponent />);

    const firstNameInput = container.querySelector('input[name="firstName"]')!;
    const lastNameInput = container.querySelector('input[name="lastName"]')!;
    const usernameInput = container.querySelector('input[name="username"]')!;
    const addressInput = container.querySelector('input[name="address"]')!;
    const genderInput = container.querySelector('select[name="gender"]')!;

    fireEvent.change(firstNameInput, { target: { value: payload.firstName } });
    fireEvent.change(lastNameInput, { target: { value: payload.lastName } });
    fireEvent.change(usernameInput, { target: { value: payload.username } });
    fireEvent.change(addressInput, { target: { value: payload.address } });
    fireEvent.change(genderInput, { target: { value: payload.gender } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(payload, source);
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
      expect(screen.getByText('User successfully created.')).toBeInTheDocument();
    });
  });

  it('updates an existing user', async () => {
    const mockCallback = jest.fn();
    const updatedUsername = 'emanning10';
    const spy = jest.spyOn(UserService, 'updateUser');
    const { container } = render(
      <TestComponent
        variant="update"
        initialValues={{ ...payload, _id: '12345' }}
        callback={mockCallback}
      />
    );

    const usernameInput = container.querySelector('input[name="username"]')!;

    fireEvent.change(usernameInput, { target: { value: updatedUsername } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        '12345',
        { ...payload, username: updatedUsername },
        source
      );
      expect(mockCallback).toHaveBeenCalled();
      expect(screen.getByText('User successfully updated.')).toBeInTheDocument();
    });
  });

  it('renders the error messaging when submitting empty responses', async () => {
    render(
      <TestComponent
        initialValues={{
          _id: '',
          firstName: '',
          lastName: '',
          username: '',
          address: '',
          gender: '' as Gender
        }}
      />
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('First name is required.')).toBeInTheDocument();
      expect(screen.getByText('Last name is required.')).toBeInTheDocument();
      expect(screen.getByText('Username is required.')).toBeInTheDocument();
      expect(screen.getByText('Address is required.')).toBeInTheDocument();
      expect(screen.getByText('Gender is required.')).toBeInTheDocument();
    });
  });

  it('renders the error toast when the user fails to create', async () => {
    UserService.createUser = jest
      .fn()
      .mockRejectedValue(() => new Error('there was an error'));
    render(<TestComponent initialValues={{ ...payload, _id: '' }} />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(
        screen.getByText('There was an error creating the user.')
      ).toBeInTheDocument();
    });
  });

  it('renders the error toast when the user fails to update', async () => {
    UserService.updateUser = jest
      .fn()
      .mockRejectedValue(() => new Error('there was an error'));
    render(
      <TestComponent variant="update" initialValues={{ ...payload, _id: '12345' }} />
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(
        screen.getByText('There was an error updating the user.')
      ).toBeInTheDocument();
    });
  });
});
