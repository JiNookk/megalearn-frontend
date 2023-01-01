import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SectionModal from './SectionModal';

const setIsModal = jest.fn();
const mockSave = jest.fn();

jest.mock('../../hooks/useSectionStore', () => () => ({
  save: mockSave,
  modifyingSection: {},
  completeModify: jest.fn(),
}));

const lecture = {
  id: 1,
  title: '수업 1',
  videoUrl: 'videoUrl',
  lectureNote: 'lectureNote',
};

describe('SectionModal', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <SectionModal
          onIsModal={setIsModal}
          lecture={lecture}
        />
      </MemoryRouter>
    ));
  });

  it('renders modifyingModal screen', () => {
    screen.getByLabelText('제목');
    screen.getByLabelText('학습 목표');

    fireEvent.click(screen.getByText('취소'));
    fireEvent.click(screen.getByText('저장'));

    expect(setIsModal).toBeCalled();
    expect(mockSave).toBeCalled();
  });
});
