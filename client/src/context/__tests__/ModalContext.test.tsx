import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
                action: jest.fn()
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
    render(<Wrapper />);

    fireEvent.click(screen.getByText('open modal'));

    expect(screen.getByText('isModalOpen: true')).toBeInTheDocument();
    expect(screen.getByText('title: Confirm')).toBeInTheDocument();
    expect(
      screen.getByText('message: Are you sure you would like to proceed?')
    ).toBeInTheDocument();
  });

  it('closes the modal', () => {
    render(<Wrapper />);

    fireEvent.click(screen.getByText('open modal'));
    expect(screen.getByText('isModalOpen: true')).toBeInTheDocument();

    fireEvent.click(screen.getByText('close modal'));
    expect(screen.getByText('isModalOpen: false')).toBeInTheDocument();
  });
});
