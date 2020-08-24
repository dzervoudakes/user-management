import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Field } from 'formik';
import TextInput from '..';

describe('TextInput', () => {
  it('renders', () => {
    const { getByDisplayValue } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => (
          <Field error="error text" label="Label" name="test" component={TextInput} />
        )}
      </Formik>
    );

    expect(getByDisplayValue('input value')).toBeInTheDocument();
  });

  it('renders the required state', () => {
    const { getByText } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => (
          <Field
            error="error text"
            label="Label"
            name="test"
            required
            component={TextInput}
          />
        )}
      </Formik>
    );

    expect(getByText('*')).toBeInTheDocument();
  });
});
