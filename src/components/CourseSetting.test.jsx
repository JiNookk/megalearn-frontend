import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CourseSetting from './CourseSetting';

const mockSave = jest.fn();

jest.mock('../hooks/useCourseStore', () => () => ({
  save: mockSave,
  course: {
    id: 1,
  },
}));

test('CourseSetting', async () => {
  render((
    <MemoryRouter>
      <CourseSetting />
    </MemoryRouter>
  ));

  screen.getByText('설정');
  screen.getByText('강의설정');

  fireEvent.change(screen.getByLabelText('가격 설정'), {
    target: { value: 10 },
  });

  screen.getByPlaceholderText('가격을 설정해주세요');

  // interval을 어떻게 테스트하면 좋을까>?
  // await waitFor(() => {
  //   expect(screen.getByLabelText('가격 설정').value).toBe(10000);
  // });
});
