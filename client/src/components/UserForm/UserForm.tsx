import React, { useEffect, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import TextInput from '@src/components/TextInput';
import SelectInput from '@src/components/SelectInput';
import { UserService } from '@src/services';
import Api from '@src/api/Api';
import { Gender } from '@src/context';
import { useToast, useUser } from '@src/hooks';
import './UserForm.scss';

// @todo in backend, check that the 'username' doesn't exist first before creating a new user
// @todo Yup validation schema doesn't seem to be working (fix this along with the unit tests)

interface Values {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  gender: Gender;
}

export interface UserFormProps {
  callback?: () => void;
  initialValues?: Values;
  variant?: 'create' | 'update';
}

const defaultInitialValues = {
  _id: '',
  firstName: '',
  lastName: '',
  username: '',
  address: '',
  gender: 'male' as Gender
};

const UserForm: React.FC<UserFormProps> = ({
  callback = noop,
  initialValues = defaultInitialValues,
  variant = 'create'
}) => {
  const [unblock, setUnblock] = useState(false);
  const history = useHistory();
  const { openToast } = useToast();
  const { getUsers } = useUser();

  const source = Api.source();

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUpdateVariant = variant === 'update';

  const handleSubmit = async (values: Values): Promise<void> => {
    try {
      await (isUpdateVariant
        ? UserService.updateUser(values._id, values, source)
        : UserService.createUser(omit(values, ['_id']), source));

      setUnblock(true);

      await getUsers();
      await openToast({
        variant: 'success',
        message: `User successfully ${isUpdateVariant ? 'updated' : 'created'}.`
      });

      if (!isUpdateVariant) {
        history.push('/');
      } else {
        callback();
      }
    } catch (err) {
      if (!Api.isCancel(err)) {
        openToast({
          variant: 'error',
          message: `There was an error ${
            isUpdateVariant ? 'updating' : 'creating'
          } the user.`
        });
      }
    }
  };

  const defineValidationRoutine = (field: string): Yup.AnySchema => {
    return Yup.string().required(`${field} is required.`).trim(`${field} is required.`);
  };

  const validationSchema = Yup.object().shape({
    firstName: defineValidationRoutine('First name'),
    lastName: defineValidationRoutine('Last name'),
    username: defineValidationRoutine('Username'),
    address: defineValidationRoutine('Address'),
    gender: defineValidationRoutine('Gender')
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ dirty, errors, values }) => (
        <>
          <Prompt
            when={dirty && !unblock}
            message="You have unsaved changes. Would you like to proceed?"
          />
          <Form className="user-form">
            <div className="form-row">
              <div className="form-item">
                <Field
                  name="firstName"
                  label="First Name"
                  placeholder="Fakey"
                  error={errors.firstName}
                  component={TextInput}
                />
                <ErrorMessage name="firstName" component="p" />
              </div>
              <div className="form-item">
                <Field
                  name="lastName"
                  label="Last Name"
                  placeholder="McFakerson"
                  error={errors.lastName}
                  component={TextInput}
                />
                <ErrorMessage name="lastName" component="p" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <Field
                  name="username"
                  label="Username"
                  placeholder="foobar123"
                  error={errors.username}
                  component={TextInput}
                />
                <ErrorMessage name="username" component="p" />
              </div>
              <div className="form-item">
                <Field
                  name="address"
                  label="Address"
                  placeholder="21 Jump St, Denver, CO 80203"
                  error={errors.address}
                  component={TextInput}
                />
                <ErrorMessage name="address" component="p" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <Field
                  name="gender"
                  label="Gender"
                  options={[
                    <option key="male" value="male">
                      Male
                    </option>,
                    <option key="female" value="female">
                      Female
                    </option>,
                    <option key="other" value="other">
                      Other
                    </option>
                  ]}
                  error={errors.gender}
                  component={SelectInput}
                />
                <ErrorMessage name="gender" component="p" />
              </div>
              <Button
                onClick={() => handleSubmit(values)}
                color="primary"
                variant="outlined"
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default UserForm;
