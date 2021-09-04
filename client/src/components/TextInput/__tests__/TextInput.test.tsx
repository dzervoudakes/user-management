import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import TextInput from '..';

describe('TextInput', () => {
  it('renders', () => {
    render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <TextInput label="Label" name="test" placeholder="Placeholder" />}
      </Formik>
    );

    expect(screen.getByDisplayValue('input value')).toBeInTheDocument();
  });

  it('renders the required state', () => {
    render(
      <Formik initialValues={{ test: 'input value' }} onSubmit={jest.fn()}>
        {() => <TextInput label="Label" name="test" placeholder="Placeholder" required />}
      </Formik>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
