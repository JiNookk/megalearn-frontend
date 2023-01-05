import { useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import useInquiryStore from '../hooks/useInquiryStore';

import { TabHeading } from './ui/Tab';
import SearchForm from './forms/SearchForm';
import { dateFormat } from '../utils/DateFormat';
import useCourseStore from '../hooks/useCourseStore';

const Board = styled.article`
  width: 60%;
`;

const List = styled.li`
  list-style: none;
  border-block: 1px solid black;
  padding: 1rem;

  h2{
    font-size: 1.3rem;
    font-weight: bold;
    margin-block-end: 1rem;
  }

  div{
    display: flex;
  }
`;

export default function InquiryBoard({ onNavigate }) {
  const courseId = +window.location.pathname.split('/')[2];
  const lectureId = +window.location.pathname.split('/')[4];

  const courseStore = useCourseStore();
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
    inquiryStore.fetchInquiriesByInstructorId();
  }, []);

  return (
    <Board>
      <TabHeading>
        <h2>질문 게시판</h2>
      </TabHeading>
      <SearchForm />
      <ul>
        {inquiryStore.inquiryPosts.length ? (
          inquiryStore.inquiryPosts
            .filter((inquiryPost) => (lectureId
              ? inquiryPost.lectureId === +lectureId
              : inquiryPost.courseId === +courseId))
            .map((inquiryPost) => (
              <List
                key={inquiryPost.id}
                // onClick={() => handleClickInquiry(inquiryPost.id)}
              >
                <Link to={`/inquiries/${inquiryPost.id}`}>
                  <h2>
                    {inquiryPost.title}
                  </h2>
                  <p>
                    {inquiryPost.content}
                  </p>
                  <div>
                    <p>
                      {inquiryPost.publisher}
                      {' '}
                      •
                      {' '}
                      <span>
                        {dateFormat.fromNow(inquiryPost.publishTime)}
                      </span>
                    </p>
                    {' '}
                    •
                    {' '}
                    {lectureId
                      ? (
                        <p>
                          {inquiryPost.lectureTime?.minute
                            ? `강의시간 - ${inquiryPost.lectureTime?.minute}:${inquiryPost.lectureTime?.second}`
                            : null}
                        </p>
                      ) : (
                        <p>
                          {courseStore.course.title}
                        </p>
                      )}
                  </div>
                </Link>
              </List>
            ))) : '질문이 존재하지 않습니다.'}
      </ul>
      {lectureId ? (
        <button type="button" onClick={handleClickPostInquiry}>
          글 작성하기
        </button>
      ) : null}
    </Board>
  );
}
