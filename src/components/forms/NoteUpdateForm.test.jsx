import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NoteUpdateForm from './NoteUpdateForm';

const mockCancel = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../../hooks/useNoteStore', () => () => ({
  cancelUpdate: mockCancel,
  updateNote: mockUpdate,
}));

const note = {
  content: 'content',
  lectureTime: { minute: 1, second: 24 },
  lectureId: 1,
  id: 1,
};

describe('NoteUpdateForm', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <NoteUpdateForm note={note} />
      </MemoryRouter>
    ));
  });

  it('renders screen', async () => {
    fireEvent.change(screen.getByPlaceholderText('마크다운, 단축키를 이용해서 편리하게 글을 작성할 수 있어요.'), {
      target: { value: 'update' },
    });

    fireEvent.click(screen.getByText('업데이트'));

    expect(mockUpdate).toBeCalledWith({ content: 'update', noteId: 1 });

    fireEvent.click(screen.getByText('취소'));

    expect(mockCancel).toBeCalled();
  });
});
