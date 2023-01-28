import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import useCourseStore from '../hooks/useCourseStore';
import useInquiryStore from '../hooks/useInquiryStore';
import useLectureStore from '../hooks/useLectureStore';
import useProgressStore from '../hooks/useProgressStore';
import { dateFormat } from '../utils/DateFormat';
import { timeFormat } from '../utils/TimeFormat';
import CurriCulum from './CurriCulum';
import 'react-circular-progressbar/dist/styles.css';
import percentageFormat from '../utils/percentageFormat';

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
  align-items: end;

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
    align-items: center;
    
    div{
      display: flex;
      align-items: center;
    }
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 1rem;
`;

const News = styled.ul`
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
      display: flex;
      align-items: center;
    }
  }  
`;

const ProgressBarWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: .5rem;
`;

const MyStatistic = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2{
    margin: 0;
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
                    <Image src="/assets/images/default-profile.png" alt="" />
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
        <MyStatistic>
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
                  {timeFormat.hourMinute(
                    lectureStore.lectures
                      .filter((lecture) => (
                        progressStore.progresses
                          .filter((progress) => progress.courseId === +courseId)
                          .filter((progress) => progress.status === 'completed')
                          .map((progress) => progress.lectureId)
                          .reduce(((acc, lectureId) => acc || lecture.id === lectureId), false)
                      ))
                      .reduce((acc, cur) => acc + (cur.lectureTime.minute * 60)
                    + cur.lectureTime.second, 0),
                  )}
                </strong>
              </p>
              <p>
                총 학습 시간
              </p>
            </div>
            <div>
              <ProgressBarWrapper>
                <CircularProgressbar
                  value={percentageFormat((progressStore.progresses
                    .filter((progress) => progress.courseId === +courseId)
                    .filter((progress) => progress.status === 'completed')
                    .length
              / lectureStore.lectures.length)) || 0}
                  text={`${percentageFormat((progressStore.progresses
                    .filter((progress) => progress.courseId === +courseId)
                    .filter((progress) => progress.status === 'completed')
                    .length
          / lectureStore.lectures.length))}%` || `${0}%`}
                />

              </ProgressBarWrapper>
              <p>
                수료증
              </p>
            </div>
          </MyStudy>
        </MyStatistic>
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
                      <Image src="/assets/images/default-profile.png" alt="" />
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
