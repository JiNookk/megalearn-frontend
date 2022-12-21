import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import dateFormat from '../utils/dateFormat';
import useInquiryStore from '../hooks/useInquiryStore';
import SearchForm from './SearchForm';
import { TabHeading } from './ui/Tab';

const List = styled.li`
  list-style: none;
  border: 1px solid black;
  padding: 1rem;
  margin-block: .5rem;
`;

export default function InquiryBoard({ onNavigate }) {
  const { state } = useLocation();
  const { lectureId, courseId } = state;

  const inquiryStore = useInquiryStore();

  const handleClickPostInquiry = () => {
    onNavigate({ tab: 'post', ids: { lectureId, courseId } });
  };

  const handleClickInquiry = (inquiryId) => {
    onNavigate({
      tab: `inquiry&inquiryId=${inquiryId}`,
      ids: { lectureId, courseId, inquiryId },
    });
  };

  useEffect(() => {
    inquiryStore.fetchInquiries({ lectureId });
  }, []);

  return (
    <article>
      <TabHeading>
        <h2>질문 게시판</h2>
      </TabHeading>
      <SearchForm />
      <ul>
        {inquiryStore.inquiryPosts.length ? (
          inquiryStore.inquiryPosts.map((inquiryPost) => (
            <List key={inquiryPost.id} onClick={() => handleClickInquiry(inquiryPost.id)}>
              <h2>
                {inquiryPost.title}
              </h2>
              <p>
                {inquiryPost.content}
              </p>
              <p>
                {inquiryPost.lectureTime.minute ? (
                  `강의시간 - ${inquiryPost.lectureTime?.minute}:
                  ${inquiryPost.lectureTime?.second}`
                ) : null}
              </p>
              <p>
                {inquiryPost.publisher}
                {' '}
                -
                {' '}
                <span>
                  {dateFormat(inquiryPost.publishTime)}
                </span>
              </p>
            </List>
          ))) : '질문이 존재하지 않습니다.'}
      </ul>
      <button type="button" onClick={handleClickPostInquiry}>
        글 작성하기
      </button>
    </article>
  );
}
