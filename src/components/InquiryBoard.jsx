import { useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import useInquiryStore from '../hooks/useInquiryStore';

import { TabHeading } from './ui/Tab';
import SearchForm from './forms/SearchForm';
import { dateFormat } from '../utils/DateFormat';
import useCourseStore from '../hooks/useCourseStore';
import SecondaryButton from './ui/SecondaryButton';

const Board = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: 100%;
  max-height: 100%;

  >button:last-child{
    width: 100%;
    padding-block: 1.25rem;
  }
`;

const List = styled.ul`
  flex: 1;

  li{
    list-style: none;
    margin-block: 1rem;
    border: 1px solid #D3DADD;
    border-radius: 4px;
    
    h2{
      font-size: 1.3rem;
      font-weight: 600;
      padding-block: .5rem;
      margin-block-end: 1rem;
    }
    
    div{
      display: flex;
      padding: 1rem;
      border-block-start: 1px solid #D3DADD;
    }

    div:first-child{
      flex-direction: column;
    }
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

  useEffect(() => {
    inquiryStore.fetchInquiries();
  }, []);

  return (
    <Board>
      <TabHeading>
        <h2>질문 게시판</h2>
      </TabHeading>
      <SearchForm />
      <List>
        {inquiryStore.inquiryPosts.length ? (
          inquiryStore.inquiryPosts
            .filter((inquiryPost) => (lectureId
              ? inquiryPost.lectureId === +lectureId
              : inquiryPost.courseId === +courseId))
            .map((inquiryPost) => (
              <li key={inquiryPost.id}>
                <Link to={lectureId
                  ? `/courses/${courseId}/lectures/${lectureId}?tab=inquiry&inquiryId=${inquiryPost.id}`
                  : `/inquiries/${inquiryPost.id}`}
                >
                  <div>
                    <h2>
                      {inquiryPost.title}
                    </h2>
                    {/* <p>
                      {inquiryPost.content}
                    </p> */}
                  </div>
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
                    {lectureId
                      ? null
                      : (
                        <p>
                          {' '}
                          •
                          {' '}
                          {courseStore.course.title}
                        </p>
                      )}
                  </div>
                </Link>
              </li>
            ))) : '질문이 존재하지 않습니다.'}
      </List>
      {lectureId ? (
        <SecondaryButton type="button" onClick={handleClickPostInquiry}>
          글 작성하기
        </SecondaryButton>
      ) : null}
    </Board>
  );
}
