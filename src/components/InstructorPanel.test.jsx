import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InstructorPanel from './InstructorPanel';

test('InstructorPanel', async () => {
  render((
    <MemoryRouter>
      <InstructorPanel title="대시보드" />
    </MemoryRouter>
  ));

  screen.getByText('대시보드');
});
