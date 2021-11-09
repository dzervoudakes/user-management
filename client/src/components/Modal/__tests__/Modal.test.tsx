import { render, screen } from '@testing-library/react';

import { ModalContext } from '@src/context';

import Modal from '..';

describe('Modal', () => {
  const MockModalProvider: React.FC = ({ children }) => {
    const modalContent = { title: 'Title', message: 'Message', action: jest.fn() };

    return (
      <ModalContext.Provider
        value={{
          isModalOpen: true,
          openModal: jest.fn(),
          closeModal: jest.fn(),
          modalContent
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  };

  const Wrapper: React.FC = () => (
    <MockModalProvider>
      <Modal />
    </MockModalProvider>
  );

  it('renders the given content', () => {
    render(<Wrapper />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Proceed')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
