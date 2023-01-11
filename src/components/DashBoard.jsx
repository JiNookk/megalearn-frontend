/* eslint-disable react/no-array-index-key */
import moment from 'moment';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useDateStore from '../hooks/useDateStore';
import useInquiryStore from '../hooks/useInquiryStore';
import useLectureStore from '../hooks/useLectureStore';
import useNoteStore from '../hooks/useNoteStore';
import useProgressStore from '../hooks/useProgressStore';
import { dateFormat } from '../utils/DateFormat';
import percentageFormat from '../utils/percentageFormat';
import { timeFormat } from '../utils/TimeFormat';
import WeeklyChart from '../utils/WeeklyChart';
import YearlyChart from '../utils/YearlyChart';
import SubTitle from './ui/SubTitle';

const Board = styled.ul`
  display: grid;
  grid: 260px 260px 260px / repeat(auto-fit, minmax(300px, 1fr));

  gap: 20px;

  > li{
    padding: 2rem;
    border: 1px solid #dee2e6;
    border-radius: .5rem;

    h3{
      margin: 0;
    }
  }
`;

const Progress = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: 1rem 2rem;

  p{
    font-size: .9rem;
  }

  p:last-child{
    color: #c4cad0;
  }
`;

const Days = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-block: 2rem;
  text-align: center;
`;

const TotalRecord = styled.ul`
  display: flex;

  li{
    margin-inline-end: 2rem;

  h4{
    color: #c4cad0;
  }

  p{
    font-weight: bold;
  }
  }
`;

const LectureLink = styled(Link)`
  display: block;
  text-align: center;
  padding-block: 1rem;
  border-radius: .5rem;
  color: white;
  background-color: #02c471;
`;

const Skills = styled.ul`
  display: flex;
  flex-wrap: wrap;
  
  li{
    display: flex;
    align-items: center;
    margin-inline-end: .5rem;

    span{
      height:2rem;
      display: flex;
      align-items: center;
      padding-inline: .5rem;
    }

    span:first-child{
      margin-block: .4rem;
      border-radius: 2rem 0 0 2rem  ;
      background: #e9fbf8;
    }
    
    span:last-child{
      background: #f1f3f5;  
      border-radius:  0 2rem 2rem 0;
    }
  }
`;

const Weeks = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
`;

const YearlyStudy = styled.li`
  grid-column-start: span 2;
`;

const BlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block-end: 2rem;

  button{
    margin-inline: 1rem;
    border: none;
    background: none;
  }
`;

const List = styled.ul`
  li{
    h3{
      font-weight: normal;
    }
    
    p{
      margin-block: .8rem;
      color: #c2c9ce;
    }
  }
`;

export default function DashBoard() {
  const courseStore = useCourseStore();
  const dateStore = useDateStore();
  const inquiryStore = useInquiryStore();
  const progressStore = useProgressStore();
  const lectureStore = useLectureStore();
  const noteStore = useNoteStore();

  const handleFetchPreviousWeekData = () => {
    dateStore.prevWeek();
    noteStore.fetchWeeklyNotes({ date: dateStore.instance.format() });
    progressStore.fetchWeeklyProgresses({ date: dateStore.instance.format() });
  };

  const handleFetchNextWeekData = () => {
    dateStore.nextWeek();
    noteStore.fetchWeeklyNotes({ date: dateStore.instance.format() });
    progressStore.fetchWeeklyProgresses({ date: dateStore.instance.format() });
  };

  const handleLastYearData = () => {

  };

  const handleNextYearData = () => {

  };

  useEffect(() => {
    dateStore.currentTime();
    courseStore.fetchMyCourses();
    inquiryStore.fetchMyInquiries();
    progressStore.fetchProgresses();
    lectureStore.fetchMyLectures();
    noteStore.fetchMyNotes();

    noteStore.fetchWeeklyNotes({ date: dateStore.instance.format() });
    progressStore.fetchWeeklyProgresses({ date: dateStore.instance.format() });
  }, []);

  return (
    <Board>
      <li>
        <BlockHeader>
          <SubTitle>
            최근 학습 강의
          </SubTitle>
          <Link to="/account/my-courses">
            {'전체 보기 >'}
          </Link>
        </BlockHeader>
        {courseStore.courses
          .filter((course) => course.id === progressStore.progresses[0]?.courseId)
          .map((course) => (
            <>
              <SubTitle>
                {course.title}
              </SubTitle>
              <Progress>
                <p>
                  진도율 :
                  {' '}
                  {progressStore.progresses
                    .filter((progress) => progress.courseId === course.id)
                    .length}
                  강 /
                  {' '}
                  {lectureStore.lectures
                    .filter((lecture) => lecture.courseId === course.id)
                    .length}
                  강 (
                  {
                    percentageFormat(progressStore.progresses
                      .filter((progress) => progress.courseId === course.id)
                      .length
                      / lectureStore.lectures
                        .filter((lecture) => lecture.courseId === course.id)
                        .length)
                  }
                  %)
                </p>
                <p>
                  {dateFormat.fromNow(progressStore.progresses[0].updatedAt)}
                </p>
              </Progress>
              <LectureLink to={`/courses/${course.id}/lectures/${progressStore.progresses[0].lectureId}`}>
                바로 학습
              </LectureLink>
            </>
          ))}
      </li>
      <li>
        <BlockHeader>
          <SubTitle>
            주간 학습
          </SubTitle>
        </BlockHeader>
        <Weeks>
          <button type="button" onClick={handleFetchPreviousWeekData}>
            {'<'}
          </button>
          <h3>
            {dateStore.year}
            년
            {' '}
            {dateStore.month}
            월
            {' '}
            {dateStore.week}
            주차
          </h3>
          <button type="button" onClick={handleFetchNextWeekData}>
            {'>'}
          </button>
        </Weeks>
        <Days>
          {['일', '월', '화', '수', '목', '금', '토']
            .map((day, i) => (
              <li key={i}>
                <p>
                  {day}
                </p>
                {/* <div> */}
                <WeeklyChart
                  lectureCount={progressStore.progresses
                    .filter((progress) => (
                      dateStore.instance.day(i).format('YY.MM.DD')
                      === moment(progress.completedAt).format('YY.MM.DD')
                    )).length}
                  lectureTime={lectureStore.lectures
                    .filter((lecture) => (
                      progressStore.progresses
                        .filter((progress) => (
                          dateStore.instance.day(i).format('YY.MM.DD')
                          === moment(progress.completedAt).format('YY.MM.DD')
                        ))
                        .reduce((acc, progress) => acc || progress.lectureId === lecture.id, false)
                    ))
                    .reduce((acc, lecture) => acc + 60 * lecture.lectureTime.minute, 0)}
                  noteCount={noteStore.notes
                    .filter((note) => (
                      dateStore.instance.day(i).format('YY.MM.DD')
                            === moment(note.publishTime).format('YY.MM.DD')
                    ))
                    .length}
                />
              </li>
            ))}
        </Days>
        <TotalRecord>
          <li>
            ▶️
            {' '}
            {progressStore.weeklyProgresses.length}
          </li>
          <li>
            ⏰
            {' '}
            {timeFormat.hourMinute(lectureStore.lectures
              .filter((lecture) => (
                progressStore.weeklyProgresses
                  .map((progress) => progress.lectureId)
                  ?.reduce((acc, lectureId) => acc || lectureId === lecture.id, false)
              ))
              ?.reduce((prevLectureTime, lecture) => (
                prevLectureTime + 60 * (lecture.lectureTime?.minute || 0)
              ), 0))}
          </li>
          <li>
            📝
            {' '}
            {noteStore.weeklyNotes.length}
          </li>
        </TotalRecord>
      </li>
      <li>
        <BlockHeader>
          <SubTitle>
            최근 내 노트
          </SubTitle>
          <Link to="/account/my-notes">
            {'전체 보기 >'}
          </Link>
        </BlockHeader>
        <List>
          {courseStore.courses
            .filter((course) => (
              lectureStore.lectures
                .filter((lecture) => (
                  noteStore.notes
                    .map((note) => note.lectureId)
                    ?.reduce((acc, lectureId) => acc || lectureId === lecture.id, false)
                ))
                .map((lecture) => lecture.courseId)
                ?.reduce((acc, courseId) => acc || courseId === course.id, false)
            ))
            .filter((_, i) => i < 5)
            .map((course) => (
              <li key={course.id}>
                <Link to={`/account/my-notes?courseId=${course.id}`}>
                  <SubTitle>
                    {course.title}
                  </SubTitle>
                  <p>
                    {dateFormat.fromNow(noteStore.notes
                      .filter((note) => (
                        lectureStore.lectures
                          .filter((lecture) => lecture.courseId === course.id)
                          .map((lecture) => lecture.id)
                          ?.reduce((acc, lectureId) => acc || lectureId === note.lectureId, false)
                      ))
                      .slice(-1)[0].publishTime)}
                  </p>
                </Link>
              </li>
            ))}
        </List>
      </li>
      <li>
        <BlockHeader>
          <SubTitle>
            최근 내 질문
          </SubTitle>
          <Link to="/account/my-posts">
            {'전체 보기 >'}
          </Link>
        </BlockHeader>
        <List>
          {inquiryStore.inquiryPosts
            .filter((_, i) => i < 5)
            .map((inquiry) => (
              <li key={inquiry.id}>
                <Link to={`/inquiries/${inquiry.id}`}>
                  <SubTitle>
                    {inquiry.title}
                  </SubTitle>
                  <p>{dateFormat.fromNow(inquiry.publishTime)}</p>
                </Link>
              </li>
            ))}
        </List>
      </li>
      <YearlyStudy>
        <BlockHeader>
          <SubTitle>
            연간 학습
          </SubTitle>
          <p>
            2023년
          </p>
        </BlockHeader>
        <YearlyChart
          progresses={
            progressStore.progresses
              .filter((progress) => progress.status === 'completed')
          }
        />
        <TotalRecord>
          <li>
            <h4>
              ▶️ 완료 수업
            </h4>
            <p>
              {progressStore.progresses
                .filter((progress) => progress.status === 'completed')
                .length}
            </p>
          </li>
          <li>
            <h4>
              ⏰ 총 학습
            </h4>
            <p>
              {lectureStore.lectures
                .filter((lecture) => (
                  progressStore.progresses
                    .filter((progress) => progress.status === 'completed')
                    .map((progress) => progress.lectureId)
                    ?.reduce((acc, lectureId) => acc || lectureId === lecture.id, false)
                ))
                .length}
            </p>
          </li>
          <li>
            <h4>
              📝 노트
            </h4>
            <p>
              2
            </p>
          </li>
          <li>
            <h4>
              ✅ 완강
            </h4>
            <p>
              1
            </p>
          </li>
        </TotalRecord>
      </YearlyStudy>
      <li>
        <BlockHeader>
          <SubTitle>
            스킬 태그
          </SubTitle>
        </BlockHeader>
        <Skills>
          {Object.entries(courseStore.courses
            .reduce((prevTags, course) => [
              ...prevTags,
              ...course.skillSets,
            ], [])
            .reduce((prevTags, curTag) => ({
              ...prevTags,
              [curTag]: prevTags[curTag] ? prevTags[curTag] + 1 : 1,
            }), {}))
            .map((skillSet, i) => (
              <li key={i}>
                <span>
                  {skillSet[0]}
                </span>
                <span>
                  {skillSet[1]}
                </span>
              </li>
            ))}
        </Skills>
      </li>
    </Board>
  );
}
