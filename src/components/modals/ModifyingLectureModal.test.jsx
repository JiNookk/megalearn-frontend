import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ModifyingLectureModal from './ModifyingLectureModal';

const setIsModal = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../../hooks/useLectureStore', () => () => ({
  update: mockUpdate,
}));

const lecture = {
  id: 1,
  title: '수업 1',
  videoUrl: 'videoUrl',
  lectureNote: 'lectureNote',
};

describe('ModifyingLectureModal', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <ModifyingLectureModal
          onIsModal={setIsModal}
          lecture={lecture}
        />
      </MemoryRouter>
    ));
  });

  it('renders modifyingModal screen', () => {
    screen.getByLabelText('제목');
    screen.getByLabelText('영상 업로드');
    screen.getByLabelText('수업 노트 작성');
    screen.getByLabelText('자료 파일 업로드');

    fireEvent.click(screen.getByText('취소'));
    fireEvent.click(screen.getByText('저장'));

    expect(setIsModal).toBeCalled();
    expect(mockUpdate).toBeCalled();
  });
});
