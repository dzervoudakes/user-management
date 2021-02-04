import React from 'react';
import classnames from 'classnames';
import { FieldInputProps } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface TextInputProps {
  error: string;
  label: string;
  required?: boolean;
  field: FieldInputProps<string>;
}

const TextInput: React.FC<TextInputProps> = ({
  error,
  label,
  required = false,
  field
}) => {
  const styles = makeStyles((theme) => ({
    textField: {
      marginRight: theme.spacing(2)
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

export default TextInput;
