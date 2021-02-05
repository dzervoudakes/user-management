import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import TextInput from '..';

describe('TextInput', () => {
  it('renders', () => {
    const { getByDisplayValue } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <TextInput label="Label" name="test" placeholder="Placeholder" />}
      </Formik>
    );

    expect(getByDisplayValue('input value')).toBeInTheDocument();
  });

  it('renders the required state', () => {
    const { getByText } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <TextInput label="Label" name="test" placeholder="Placeholder" required />}
      </Formik>
    );

    expect(getByText('*')).toBeInTheDocument();
  });
});
