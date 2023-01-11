import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useInquiryStore from '../hooks/useInquiryStore';
import { dateFormat } from '../utils/DateFormat';
import SubTitle from './ui/SubTitle';

const Notes = styled.div`
  width: 100%;
  border: 1px solid #e8ecef;
  
  > * {
    padding-inline: 2rem;
    padding-block-start: 2rem;
  }
  `;

const Filter = styled.ul`
  display: flex;
  list-style: disc;

  li:first-child{
    margin-inline-start: 1rem;
  }

  li{
    margin-inline-end: 2rem;
  }
`;

const Questions = styled.ul`
  padding-block-end: 2rem;
  border-block-end: 1px solid #e8ecef;
`;

const List = styled.ul`
  display: flex;

  li{
    color: #808385;
  }
`;

const Content = styled.p`
  margin-block-end: 2rem;
  color : #b7babc;
`;

export default function MyPosts() {
  const inquiryStore = useInquiryStore();
  const courseStore = useCourseStore();

  useEffect(() => {
    inquiryStore.fetchMyInquiries();
    courseStore.fetchCourses();
  }, []);

  return (
    <Notes>
      <Filter>
        <li>
          전체
        </li>
        <li>
          해결
        </li>
        <li>
          미해결
        </li>
      </Filter>
      <Questions>
        {inquiryStore.inquiryPosts
          .map((inquiry) => (
            <li key={inquiry.id}>
              <Link to={`/inquiries/${1}`}>
                <SubTitle>
                  {inquiry.title}
                </SubTitle>
                <Content>
                  {inquiry.content}
                </Content>
                <List>
                  <li>
                    {inquiry.publisher}
                    {' '}
                    •
                  </li>
                  <li>
                    {dateFormat.fromNow(inquiry.publishTime)}
                    {' '}
                    •
                  </li>
                  <li>
                    {courseStore.courses
                      .find((course) => course.id === inquiry.courseId)
                      ?.title}
                  </li>
                </List>
              </Link>
            </li>
          ))}
      </Questions>
    </Notes>
  );
}
