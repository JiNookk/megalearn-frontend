import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lecture from './Lecture';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1/lectures/2');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { lectureId: 2, courseId: 1 },
  }),
}));

jest.mock('../hooks/useProgressStore', () => () => ({
  fetchProgress: jest.fn(),
}));

describe('Lecture', () => {
  let container;

  beforeEach(async () => {
    container = render((
      <MemoryRouter>
        <Lecture />
      </MemoryRouter>
    )).container;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders components', async () => {
    await waitFor(() => {
      screen.getByText('테스트 2강');
      screen.getByText('< 이전 수업');
      screen.getByText('다음 수업 >');
      expect(container.getElementsByTagName('iframe')).toBeTruthy();
    });
  });
});
