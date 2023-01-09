import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CourseTitlePage from './CourseTitlePage';

const mockSave = jest.fn();
const mockSaveLecture = jest.fn();

jest.mock('../hooks/useCourseStore', () => () => ({
  save: mockSave,
  course: {
    id: 1,
  },
}));

jest.mock('../hooks/useLectureStore', () => () => ({
  save: mockSaveLecture,
}));

test('CourseTitlePage', async () => {
  render((
    <MemoryRouter>
      <CourseTitlePage />
    </MemoryRouter>
  ));

  screen.getByText(/제목을 입력해주세요!/);
  screen.getByText(/너무 고민하지마세요. 제목은 언제든 수정 가능해요/);

  fireEvent.change(screen.getByPlaceholderText('제목을 입력해주세요.'), {
    target: { value: 'test123' },
  });

  fireEvent.click(screen.getByText('강의만들기'));

  await waitFor(() => {
    expect(mockSave).toBeCalledWith({ title: 'test123' });
    expect(mockSaveLecture).toBeCalled();
  });
});
