import {
  cleanup,
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CommentUpdateForm from './CommentUpdateForm';

const mockUpdate = jest.fn();

jest.mock('../hooks/useCommentStore', () => () => ({
  updateComment: mockUpdate,
}));

const setIsUpdating = jest.fn();

describe('CommentUpdateForm', () => {
  beforeEach(async () => {
    render((
      <MemoryRouter>
        <CommentUpdateForm setIsUpdating={setIsUpdating} commentId={1} />
      </MemoryRouter>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('update comments', async () => {
    fireEvent.change(screen.getByPlaceholderText('수정할 내용을 입력하세요'), {
      target: { value: 'update' },
    });

    fireEvent.click(screen.getByText('수정하기'));

    expect(mockUpdate).toBeCalledWith({ commentId: 1, content: 'update' });
  });

  it('does not update comments', async () => {
    fireEvent.change(screen.getByPlaceholderText('수정할 내용을 입력하세요'), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText('수정하기'));

    await waitFor(() => {
      expect(mockUpdate).not.toBeCalled();
    });
  });

  it('cancels updating', async () => {
    fireEvent.click(screen.getByText('취소'));

    await waitFor(() => {
      expect(setIsUpdating).toBeCalledWith(false);
    });
  });
});
