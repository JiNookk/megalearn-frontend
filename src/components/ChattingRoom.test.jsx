import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { lectureStore } from '../stores/LectureStore';
import ChattingRoom from './ChattingRoom';

test('ChattingRoom', async () => {
  await lectureStore.fetchLecture({ courseId: 1, lectureId: 1 });

  render((
    <MemoryRouter>
      <ChattingRoom />
    </MemoryRouter>
  ));

  screen.getByText('수업 1 채팅방');

  fireEvent.change(screen.getByLabelText('채팅'), {
    target: { value: 'test' },
  });

  fireEvent.click(screen.getByText('전송하기'));

  await waitFor(() => {
    screen.getByText(/test/);
  });
});
