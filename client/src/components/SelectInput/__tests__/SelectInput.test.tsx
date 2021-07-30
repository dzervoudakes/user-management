import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
    render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <SelectInput name="test" id="test" label="Test" options={options} />}
      </Formik>
    );

    fireEvent.change(screen.getByDisplayValue('one'), { target: { value: 'two' } });

    expect(screen.getByDisplayValue('two')).toBeInTheDocument();
  });

  it('renders the required state', () => {
    render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => (
          <SelectInput name="test" id="test" label="test" options={options} required />
        )}
      </Formik>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
