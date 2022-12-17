import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NoteForm from './NoteForm';

const mockSave = jest.fn();

jest.mock('../hooks/useNoteStore', () => () => ({
  save: mockSave,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
}));

const onNavigate = jest.fn();

describe('NoteForm', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <NoteForm onNavigate={onNavigate} />
      </MemoryRouter>
    ));
  });

  it('renders screen', async () => {
    fireEvent.change(screen.getByPlaceholderText('마크다운, 단축키를 이용해서 편리하게 글을 작성할 수 있어요.'), {
      target: { value: '노트 필기' },
    });
    fireEvent.click(screen.getByText('노트 입력'));

    expect(mockSave).toBeCalled();
  });
});
