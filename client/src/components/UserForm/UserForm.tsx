import React, { useEffect, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import TextInput from '@src/components/TextInput';
import SelectInput from '@src/components/SelectInput';
import { UserService } from '@src/services';
import Api from '@src/api/Api';
import { Gender } from '@src/context';
import { useToast, useUser } from '@src/hooks';
import './UserForm.scss';

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
  gender: '' as Gender
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

  const handleSubmit = async (
    values: Values,
    setFieldError: (field: string, message: string) => void
  ): Promise<void> => {
    try {
      await (isUpdateVariant
        ? UserService.updateUser(values._id, omit(values, ['_id']), source)
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

        // unique error handling for anti-duplicate constraint
        const { error: description } = err.response.data;
        if (description.includes('E11000') && description.includes('username')) {
          setFieldError('username', 'Username already exists.');
        }
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
      onSubmit={(values, { setFieldError }) => handleSubmit(values, setFieldError)}
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ dirty, handleSubmit: formikHandleSubmit }) => (
        <>
          <Prompt
            when={dirty && !unblock}
            message="You have unsaved changes. Would you like to proceed?"
          />
          <Form className="user-form">
            <div className="form-row">
              <div className="form-item">
                <TextInput name="firstName" label="First Name" placeholder="Fakey" />
                <ErrorMessage name="firstName" component="p" />
              </div>
              <div className="form-item">
                <TextInput name="lastName" label="Last Name" placeholder="McFakerson" />
                <ErrorMessage name="lastName" component="p" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <TextInput name="username" label="Username" placeholder="foobar123" />
                <ErrorMessage name="username" component="p" />
              </div>
              <div className="form-item">
                <TextInput
                  name="address"
                  label="Address"
                  placeholder="21 Jump St., Denver, CO 80203"
                />
                <ErrorMessage name="address" component="p" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <SelectInput
                  name="gender"
                  label="Gender"
                  options={[
                    {
                      text: '',
                      value: ''
                    },
                    {
                      text: 'Male',
                      value: 'male'
                    },
                    {
                      text: 'Female',
                      value: 'female'
                    },
                    {
                      text: 'Other',
                      value: 'other'
                    }
                  ]}
                />
                <ErrorMessage name="gender" component="p" />
              </div>
              <Button
                onClick={() => formikHandleSubmit()}
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
