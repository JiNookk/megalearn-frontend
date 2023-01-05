import styled from 'styled-components';
import useInquiryStore from '../../hooks/useInquiryStore';
import useSearchFormStore from '../../hooks/useSearchFormStore';

const Form = styled.form`
  margin-block-end: 3rem;
`;

export default function SearchForm() {
  const lectureId = window.location.pathname.split('/')[4];

  const searchFormStore = useSearchFormStore();
  const inquiryStore = useInquiryStore();

  const handleSubmitSearchForm = (event) => {
    event.preventDefault();

    const { lectureTime, content } = searchFormStore;

    if (!content && !lectureTime) {
      inquiryStore.fetchInquiriesByLectureId({ lectureId });
      return;
    }

    inquiryStore.searchInquiries({ lectureId, lectureTime, content });

    searchFormStore.reset();
  };

  return (
    <Form onSubmit={handleSubmitSearchForm}>
      {lectureId && (
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
      )}
      <div>
        <label hidden htmlFor="input-searchContent">
          검색
        </label>
        <input
          id="input-searchContent"
          type="text"
          placeholder="검색내용"
          value={searchFormStore.content}
          onChange={(e) => searchFormStore.changeContent(e.target.value)}
        />
        <button type="submit">검색하기</button>
      </div>
    </Form>
  );
}
