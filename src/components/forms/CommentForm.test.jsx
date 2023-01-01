import {
  cleanup,
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { lectureStore } from '../../stores/LectureStore';

import CommentForm from './CommentForm';

const mockPost = jest.fn();

jest.mock('../../hooks/useCommentStore', () => () => ({
  post: mockPost,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { inquiryId: 1 },
  }),
}));

describe('CommentForm', () => {
  beforeEach(async () => {
    await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

    render((
      <MemoryRouter>
        <CommentForm />
      </MemoryRouter>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('submit message', async () => {
    fireEvent.change(screen.getByPlaceholderText('답변을 입력해주세요'), {
      target: { value: 'test' },
    });

    fireEvent.click(screen.getByText('댓글 입력'));

    expect(mockPost).toBeCalled();
  });

  it('submit blank message', async () => {
    fireEvent.change(screen.getByPlaceholderText('답변을 입력해주세요'), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText('댓글 입력'));

    await waitFor(() => {
      expect(mockPost).not.toBeCalled();
    });
  });
});
