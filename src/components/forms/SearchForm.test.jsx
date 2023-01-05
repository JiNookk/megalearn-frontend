import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from './SearchForm';

const context = describe;
const mockSearch = jest.fn();
const mockFetch = jest.fn();

delete window.location;
window.location = new URL('http://localhost:8080/courses/1/lectures/1');

jest.mock('../../hooks/useInquiryStore', () => () => ({
  searchInquiries: mockSearch,
  fetchInquiriesByLectureId: mockFetch,
}));

describe('SearchForm', () => {
  beforeEach(() => {
    render((
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    ));
  });

  context('when lectureTime and content is Blank', () => {
    it('fetches Inquiries', () => {
      fireEvent.change(screen.getByLabelText('강의 시간'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('검색'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('검색하기'));

      expect(mockFetch).toBeCalled();
    });
  });

  context('when lectureTime is valid and content is Blank', () => {
    it('searches by lectureTime', () => {
      fireEvent.change(screen.getByLabelText('강의 시간'), {
        target: { value: 3 },
      });

      fireEvent.change(screen.getByLabelText('검색'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('검색하기'));

      expect(mockSearch).toBeCalledWith({ lectureId: '1', lectureTime: 3, content: '' });
    });
  });

  context('when lectureTime is blank and content is valid', () => {
    it('searches by content', () => {
      fireEvent.change(screen.getByLabelText('강의 시간'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('검색'), {
        target: { value: '하이' },
      });

      fireEvent.click(screen.getByText('검색하기'));

      expect(mockSearch).toBeCalledWith({ lectureId: '1', lectureTime: '', content: '하이' });
    });
  });
});
