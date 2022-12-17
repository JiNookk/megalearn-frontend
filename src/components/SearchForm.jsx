import { useLocation } from 'react-router-dom';
import useInquiryStore from '../hooks/useInquiryStore';
import useSearchFormStore from '../hooks/useSearchFormStore';

export default function SearchForm() {
  const { state } = useLocation();
  const { lectureId } = state;
  const searchFormStore = useSearchFormStore();
  const inquiryStore = useInquiryStore();

  const handleSubmitSearchForm = (event) => {
    event.preventDefault();

    const { lectureTime, content } = searchFormStore;

    if (!content && !lectureTime) {
      inquiryStore.fetchInquiries({ lectureId });
      return;
    }

    inquiryStore.searchInquiries({ lectureId, lectureTime, content });

    searchFormStore.reset();
  };

  return (
    <form onSubmit={handleSubmitSearchForm}>
      <div>
        <label htmlFor="input-searchTime">
          강의 시간
        </label>
        <input
          id="input-searchTime"
          type="number"
          placeholder="분"
          value={searchFormStore.lectureTime}
          onChange={(e) => searchFormStore.changeLectureTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-searchContent">
          검색
        </label>
        <input
          id="input-searchContent"
          type="text"
          placeholder="검색내용"
          value={searchFormStore.content}
          onChange={(e) => searchFormStore.changeContent(e.target.value)}
        />
      </div>
      <button type="submit">검색하기</button>
    </form>
  );
}
