import {
  render,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HoverMessage from './HoverMessage';

test('HoverMessage', async () => {
  render((
    <MemoryRouter>
      <HoverMessage />
    </MemoryRouter>
  ));
});
