import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import InquiryForm from './InquiryForm';

const onNavigate = jest.fn();

const mockPost = jest.fn();

jest.mock('../hooks/useInquiryStore', () => () => ({
  post: mockPost,
}));

jest.mock('../hooks/useVideoStore', () => () => ({
  currentTime: () => ({ minute: 1, second: 2 }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1, lectureId: 1 },
  }),
}));

describe('InquiryForm', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <InquiryForm onNavigate={onNavigate} />
      </MemoryRouter>
    ));
  });

  it('renders postInquiry screen', async () => {
    screen.getByText('질문하기');

    fireEvent.click(screen.getByLabelText('익명'));

    fireEvent.change(screen.getByLabelText('제목'), {
      target: { value: 'title' },
    });

    fireEvent.change(screen.getByPlaceholderText('# 태그'), {
      target: { value: 'JPA' },
    });

    fireEvent.change(screen.getByLabelText('분'), {
      target: { value: 5 },
    });

    fireEvent.change(screen.getByLabelText('초'), {
      target: { value: 24 },
    });

    fireEvent.change(screen.getByPlaceholderText('무슨 생각을 하고 있나요? 궁금증을 풀어봐요!'), {
      target: { value: '의존성 정보가 궁금합니다!' },
    });

    fireEvent.click(screen.getByText('올리기'));

    await waitFor(() => {
      expect(onNavigate).toBeCalledWith({
        tab: 'inquiryBoard',
        ids: { lectureId: 1, courseId: 1 },
      });

      expect(mockPost).toBeCalledWith({
        hashTags: ['JPA'],
        content: '의존성 정보가 궁금합니다!',
        anonymous: true,
        lectureId: 1,
        title: 'title',
        minute: 5,
        second: 24,
      });
    });
  });
});
