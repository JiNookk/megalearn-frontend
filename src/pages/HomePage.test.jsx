import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('HomePage', () => {
  render(<HomePage />);

  screen.getByText('인프런에서 가치를 높이세요!');
});
