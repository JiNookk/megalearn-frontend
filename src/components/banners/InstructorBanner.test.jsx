import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InstructorBanner from './InstructorBanner';

test('InstructorBanner', async () => {
  render((
    <MemoryRouter>
      <InstructorBanner title="대시보드" />
    </MemoryRouter>
  ));

  screen.getByText('대시보드');
});
