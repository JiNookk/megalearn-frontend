import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Inquiry from './Inquiry';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { inquiryId: 1 },
  }),
}));

describe('Inquiry', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <Inquiry />
      </MemoryRouter>
    ));
  });

  it('renders screen', async () => {
    await waitFor(() => {
      screen.getAllByText(/tester/);
      screen.getByText('#JPA');
      screen.getByText('강의에서 사용하는 의존성 정보가 궁금합니다~');
      screen.getByText('1:24');
      screen.getByText(/tester2/);
      screen.getByText('저도 궁금해요~');
      screen.getByText('댓글 작성');
      screen.getByText('좋아요');
      // screen.getByText('🤔');
      // screen.getByText('👏');
    });
  });
});
