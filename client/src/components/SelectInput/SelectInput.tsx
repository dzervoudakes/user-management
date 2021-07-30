import React from 'react';
import classnames from 'classnames';
import { useField } from 'formik';
import { InputLabel, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Option {
  text: string;
  value: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  options: Option[];
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: 120
  },
  select: {
    paddingLeft: theme.spacing(2)
  }
}));

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const [field, meta] = useField(props);
  const styles = useStyles();

  const { id, required, label, options } = props;

  return (
    <FormControl
      required={required}
      className={classnames(styles.formControl, 'form-input')}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        {...field}
        id={id}
        value={field.value || ''}
        error={Boolean(meta.error)}
        classes={{ root: styles.select }}
      >
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
