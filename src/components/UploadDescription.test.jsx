import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadDescription from './UploadDescription';

const mockUpdate = jest.fn();

delete window.location;
window.location = new URL('http://localhost:8000/courses/1/edit/description');

jest.mock('../hooks/useCourseStore', () => () => ({
  update: mockUpdate,
  fetchCourse: jest.fn(),
  course: {
    id: 1,
    description: '',
  },
}));

test('UploadDescription', async () => {
  render((
    <MemoryRouter>
      <UploadDescription />
    </MemoryRouter>
  ));

  screen.getByRole('heading', { name: '상세소개' });

  // screen.getByLabelText('강의 두줄 요약');

  fireEvent.change(screen.getByLabelText('강의 상세 내용'), {
    target: { value: 'description' },
  });

  fireEvent.click(screen.getByText('저장 후 다음이동'));

  await waitFor(() => {
    expect(mockUpdate).toBeCalled();
  });
});
