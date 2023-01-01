import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import UploadCoverImage from './UploadCoverImage';

const mockSave = jest.fn();

jest.mock('../hooks/useCourseStore', () => () => ({
  save: mockSave,
  savedCourse: {
    id: 1,
  },
}));

test('UploadCoverImage', async () => {
  render((
    <MemoryRouter>
      <UploadCoverImage />
    </MemoryRouter>
  ));

  screen.getByText('강의 제작');
  screen.getByText('커버 이미지');
  screen.getByText('강의를 대표하는 이미지를 업로드해주세요.');
  screen.getByText('파일 선택');
  screen.getByText('저장 후 다음이동');
});
