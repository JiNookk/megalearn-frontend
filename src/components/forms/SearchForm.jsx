import styled from 'styled-components';
import useInquiryStore from '../../hooks/useInquiryStore';
import useSearchFormStore from '../../hooks/useSearchFormStore';

const Form = styled.form`
  margin-block-end: 3rem;
`;

const Content = styled.div`
  display: flex;
  padding: 1rem;
  margin-block: 2rem 2rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;

  input{
    width: 100%;
    border: none;
  }  

  button{
    background: none;
    border: none;
  }
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
      {/* {lectureId && (
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
      )} */}
      <Content>
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
        <button type="submit">
          <img src="/assets/images/search.png" alt="search" />
        </button>
      </Content>
    </Form>
  );
}
