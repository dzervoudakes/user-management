import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import noop from 'lodash/noop';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '@src/services';
import Api from '@src/api/Api';
import { Gender } from '@src/context';
import { useToast, useUser } from '@src/hooks';
import FormWrapper from './form-wrapper';

// @todo revisit use of uuidv4 pending MongoDB stuff

interface Values {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  gender: Gender;
}

interface UserFormProps {
  callback?: () => void;
  initialValues?: Values;
  variant?: 'create' | 'update';
}

const defaultInitialValues = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  address: '',
  gender: 'other' as Gender
};

const UserForm: React.FC<UserFormProps> = ({
  callback = noop,
  initialValues = defaultInitialValues,
  variant = 'create'
}) => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const { openToast } = useToast();
  const { getUsers } = useUser();

  const source = Api.source();

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, [source]);

  const isUpdateVariant = variant === 'update';

  const handleSubmit = async (values: Values): Promise<void> => {
    try {
      const payload = { ...values, id: isUpdateVariant ? values.id : uuidv4() };

      await (isUpdateVariant
        ? UserService.updateUser(values.id, payload, source)
        : UserService.createUser(payload, source));

      await getUsers();
      await openToast({
        variant: 'success',
        message: `User successfully ${isUpdateVariant ? 'updated' : 'created'}.`
      });

      if (!isUpdateVariant) {
        setSuccess(true);
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

  const validationSchema = (() => {
    const defineValidationRoutine = (field: string): Yup.AnySchema => {
      return Yup.string().required(`${field} is required.`).trim(`${field} is required.`);
    };

    return Yup.object().shape({
      firstName: defineValidationRoutine('First name'),
      lastName: defineValidationRoutine('Last name'),
      username: defineValidationRoutine('Username'),
      address: defineValidationRoutine('Address'),
      gender: defineValidationRoutine('Gender')
    });
  })();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {(formikProps) => <FormWrapper {...formikProps} success={success} />}
    </Formik>
  );
};

export default UserForm;
