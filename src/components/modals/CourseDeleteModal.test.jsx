import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseDeleteModal from './CourseDeleteModal';

const setIsModal = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../hooks/useCourseStore', () => () => ({
  delete: mockDelete,
}));

describe('CourseDeleteModal', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <CourseDeleteModal
          onIsModal={setIsModal}
          courseId={1}
        />
      </MemoryRouter>
    ));
  });

  it('renders screen', () => {
    screen.getByText('강의를 삭제하시겠습니까?');
    screen.getByText('삭제한 강의는 복구되지 않습니다.');
    screen.getByText('취소');

    fireEvent.click(screen.getByText('확인'));

    expect(mockDelete).toBeCalled();
  });
});
