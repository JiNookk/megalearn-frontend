import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CourseSubmitModal from './CourseSubmitModal';

const setIsModal = jest.fn();
const mockSubmit = jest.fn();

jest.mock('../../hooks/useCourseStore', () => () => ({
  submitCourse: mockSubmit,
}));

describe('CourseSubmitModal', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <CourseSubmitModal
          onIsModal={setIsModal}
          course={1}
        />
      </MemoryRouter>
    ));
  });

  it('renders modifyingModal screen', () => {
    screen.getByText('강의 제출 준비');
    screen.getByText('모든 확인이 끝나면 강의를 오픈합니다.');
    screen.getByText('모든 항목을 작성해주셨나요?'
    + '강의가격, 커리큘럼, 소개 등을 한번 더 확인해 주세요.');

    fireEvent.click(screen.getByText('확인'));
    fireEvent.click(screen.getByText('취소'));

    expect(setIsModal).toBeCalled();
    expect(mockSubmit).toBeCalled();
  });
});
