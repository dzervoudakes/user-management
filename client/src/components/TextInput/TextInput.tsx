import React from 'react';
import classnames from 'classnames';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const [field, meta] = useField(props);

  const styles = makeStyles((theme) => ({
    textField: {
      marginRight: theme.spacing(2)
    }
  }))();

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(meta.error)}
      className={classnames(styles.textField, 'form-input')}
      margin="normal"
      variant="outlined"
      value={field.value || ''}
    />
  );
};

export default TextInput;
