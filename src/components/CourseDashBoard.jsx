import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useInquiryStore from '../hooks/useInquiryStore';
import useLectureStore from '../hooks/useLectureStore';
import useProgressStore from '../hooks/useProgressStore';
import { dateFormat } from '../utils/DateFormat';
import { timeFormat } from '../utils/TimeFormat';
import CurriCulum from './CurriCulum';

const Container = styled.div`
  padding: 3rem;
`;

const DashBoard = styled.div`
  display: grid;
  grid : 260px 180px / 1fr 1fr;
  gap: 25px;
  grid-auto-flow: column;


  article{
    border: 1px solid #e8e8e9;
    padding: 2rem;
  }
`;

const MyStudy = styled.div`
  display: flex;
  justify-content: space-between;

  text-align: center;
  p{
    font-size: 1.2rem;
  }

  strong{
    font-size: 3rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const RecentQuestions = styled.article`
  grid-area: 1 / 2 / span 2;

  a{
    display: flex;
    justify-content: space-between;
    
    div{
      display: flex;
    }
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
`;

const News = styled.ul`
  li{
    display: flex;
    justify-content: space-between;

    div{
      display: flex;
    }
  }  
`;

export default function CourseDashBoard() {
  const courseId = window.location.pathname.split('/')[2];

  const courseStore = useCourseStore();
  const inquiryStore = useInquiryStore();
  const progressStore = useProgressStore();
  const lectureStore = useLectureStore();

  useEffect(() => {
    inquiryStore.fetchInquiriesByCourseId({ courseId });
    progressStore.fetchProgresses();
    lectureStore.fetchLecturesByCourseId({ courseId });
  }, []);

  return (
    <Container>
      <DashBoard>
        <article>
          <Title>
            최근 강의 공지
          </Title>
          <News>
            {courseStore.course.news
              ?.filter((_, i) => i < 4)
              .map((post) => (
                <li key={post.id}>
                  <div>
                    <Image src="/assets/images/test.jpg" alt="" />
                    <p>
                      {post.title}
                    </p>
                  </div>
                  <p>
                    {dateFormat.defaultFormat(post.createdAt)}
                  </p>
                </li>
              ))}
          </News>
        </article>
        <article>
          <Title>
            내 학습상황
          </Title>
          <MyStudy>
            <div>
              <p>
                <strong>
                  {progressStore.progresses
                    .filter((progress) => progress.courseId === +courseId)
                    .filter((progress) => progress.status === 'completed')
                    .length}
                  /
                  {lectureStore.lectures.length}
                </strong>
              </p>
              <p>
                완료 수업
              </p>
            </div>
            <div>
              <p>
                <strong>
                  {timeFormat.hourMinute(progressStore.progresses
                    .filter((progress) => progress.courseId === +courseId)
                    .reduce((acc, cur) => acc + (cur.lectureTime.minute * 60)
                    + cur.lectureTime.second, 0))}
                </strong>
              </p>
              <p>
                총 학습 시간
              </p>
            </div>
            <div>
              <strong>
                {(progressStore.progresses
                  .filter((progress) => progress.courseId === +courseId)
                  .filter((progress) => progress.status === 'completed')
                  .length
              / lectureStore.lectures.length) || 0}
              </strong>
              <p>
                수료증
              </p>
            </div>
          </MyStudy>
        </article>
        <RecentQuestions>
          <Title>
            최근 질문
          </Title>
          <ul>
            {inquiryStore.inquiryPosts
              .filter((_, i) => i < 10)
              .map((inquiry) => (
                <li key={inquiry.id}>
                  <Link to={`/inquiries/${inquiry.id}`}>
                    <div>
                      <Image src="/assets/images/test.jpg" alt="" />
                      <p>{inquiry.title}</p>
                    </div>
                    <p>{dateFormat.fromNow(inquiry.publishTime)}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </RecentQuestions>
      </DashBoard>
      <CurriCulum />
    </Container>
  );
}
