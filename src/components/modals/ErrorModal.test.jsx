import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorModal from './ErrorModal';

const setIsModal = jest.fn();

describe('ErrorModal', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <ErrorModal onIsModal={setIsModal} />
      </MemoryRouter>
    ));
  });

  it('renders errorModal screen', () => {
    screen.getByText('입력 값 확인');
    screen.getByText(/을 필수로 작성해주세요/);

    fireEvent.click(screen.getByText('확인'));

    expect(setIsModal).toBeCalled();
  });
});
