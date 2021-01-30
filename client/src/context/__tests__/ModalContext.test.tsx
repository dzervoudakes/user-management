import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import noop from 'lodash/noop';
import { ModalContext, ModalProvider } from '..';

describe('ModalContext', () => {
  const TestComponent: React.FC = () => (
    <ModalContext.Consumer>
      {({ isModalOpen, modalContent, openModal, closeModal }) => (
        <div>
          <div>isModalOpen: {isModalOpen.toString()}</div>
          <div>title: {modalContent.title}</div>
          <div>message: {modalContent.message}</div>
          <button
            onClick={() =>
              openModal({
                title: 'Confirm',
                message: 'Are you sure you would like to proceed?',
                action: noop
              })
            }
            type="button"
          >
            open modal
          </button>
          <button onClick={closeModal} type="button">
            close modal
          </button>
        </div>
      )}
    </ModalContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <ModalProvider>
      <TestComponent />
    </ModalProvider>
  );

  it('provides the current state of the modal', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('open modal'));

    expect(getByText('isModalOpen: true')).toBeInTheDocument();
    expect(getByText('title: Confirm')).toBeInTheDocument();
    expect(
      getByText('message: Are you sure you would like to proceed?')
    ).toBeInTheDocument();
  });

  it('closes the modal', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('open modal'));
    expect(getByText('isModalOpen: true')).toBeInTheDocument();

    fireEvent.click(getByText('close modal'));
    expect(getByText('isModalOpen: false')).toBeInTheDocument();
  });
});
