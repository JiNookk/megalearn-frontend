import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DefaultBanner from './DefaultBanner';

test('DefaultBanner', async () => {
  render((
    <MemoryRouter>
      <DefaultBanner title="대시보드" />
    </MemoryRouter>
  ));

  screen.getByText('대시보드');
});
