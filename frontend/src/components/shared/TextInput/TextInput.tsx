import React from 'react';
import classnames from 'classnames';
import { FieldInputProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface TextInputProps {
  error: string;
  label: string;
  required?: boolean;
  field: FieldInputProps<string>;
}

const FormInput: React.FC<TextInputProps> = ({
  error,
  label,
  required = false,
  field
}) => {
  const styles = makeStyles((theme) => ({
    textField: {
      marginRight: theme.spacing(1)
    }
  }))();

  return (
    <TextField
      required={required}
      error={Boolean(error)}
      label={label}
      className={classnames(styles.textField, 'form-input')}
      margin="normal"
      variant="outlined"
      {...field}
    />
  );
};

export default FormInput;
