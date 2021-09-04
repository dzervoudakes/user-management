import { renderHook } from '@testing-library/react-hooks';
import { ModalContext } from '@src/context';
import { useModal } from '..';

describe('useModal', () => {
  const mockModalContent = { title: 'title', message: 'message', action: jest.fn() };

  const TestComponent: React.FC = ({ children }) => {
    const isModalOpen = false;
    const modalContent = mockModalContent;
    const openModal = jest.fn();
    const closeModal = jest.fn();

    return (
      <ModalContext.Provider value={{ isModalOpen, modalContent, openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    );
  };

  it('returns the current value of ModalContext', () => {
    const { result } = renderHook(() => useModal(), { wrapper: TestComponent });
    const { isModalOpen, modalContent } = result.current;

    expect(isModalOpen).toBe(false);
    expect(modalContent).toBe(mockModalContent);
  });
});
