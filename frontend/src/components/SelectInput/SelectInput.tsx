import React from 'react';
import classnames from 'classnames';
import { FieldInputProps } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface SelectInputProps {
  error: string;
  label: string;
  required?: boolean;
  options: HTMLOptionElement[];
  field: FieldInputProps<string>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  error,
  label,
  required = false,
  options,
  field
}) => {
  const styles = makeStyles((theme) => ({
    formControl: {
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 120
    }
  }))();

  return (
    <FormControl
      required={required}
      className={classnames(styles.formControl, 'form-input')}
      error={Boolean(error)}
    >
      <InputLabel htmlFor="gender">{label}</InputLabel>
      <Select native {...field}>
        <option value="" />
        {options}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
