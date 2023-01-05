import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CourseBanner from './CourseBanner';

delete window.location;
window.location = new URL('http://localhost:8000/courses/1');

test('CourseBanner', async () => {
  render((
    <MemoryRouter>
      <CourseBanner />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('분야: 개발,프로그래밍 > 백엔드');
    screen.getByText('강의 1');
    screen.getByText('별점: 3.00');
    screen.getByText('수강생: 2명');
    screen.getByText('지식공유자: 오진성');
    screen.getByText('해시태그: 단백질, 득근');
    screen.getByText('이어 학습하기');
  });
});
