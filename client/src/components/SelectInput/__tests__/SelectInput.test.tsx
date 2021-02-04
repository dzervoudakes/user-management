import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik, Field } from 'formik';
import SelectInput from '..';

describe('SelectInput', () => {
  const options = [
    <option key="one" value="one">
      one
    </option>,
    <option key="two" value="two">
      two
    </option>,
    <option key="three" value="three">
      three
    </option>
  ];

  it('renders', () => {
    const { getByDisplayValue } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => (
          <Field
            error="error text"
            label="Label"
            name="test"
            options={options}
            component={SelectInput}
          />
        )}
      </Formik>
    );

    fireEvent.change(getByDisplayValue('one'), { target: { value: 'two' } });

    expect(getByDisplayValue('two')).toBeInTheDocument();
  });

  it('renders the required state', () => {
    const { getByText } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => (
          <Field
            error="error text"
            label="Label"
            name="test"
            options={options}
            required
            component={SelectInput}
          />
        )}
      </Formik>
    );

    expect(getByText('*')).toBeInTheDocument();
  });
});
