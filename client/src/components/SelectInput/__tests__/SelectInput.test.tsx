import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import SelectInput from '..';

describe('SelectInput', () => {
  const options = [
    {
      text: 'one',
      value: 'one'
    },
    {
      text: 'two',
      value: 'two'
    },
    {
      text: 'three',
      value: 'three'
    }
  ];

  it('renders', () => {
    const { getByDisplayValue } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <SelectInput name="test" label="Test" options={options} />}
      </Formik>
    );

    fireEvent.change(getByDisplayValue('one'), { target: { value: 'two' } });

    expect(getByDisplayValue('two')).toBeInTheDocument();
  });

  it('renders the required state', () => {
    const { getByText } = render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <SelectInput name="test" label="Test" options={options} required />}
      </Formik>
    );

    expect(getByText('*')).toBeInTheDocument();
  });
});
