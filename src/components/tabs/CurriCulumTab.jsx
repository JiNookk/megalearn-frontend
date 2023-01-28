/* eslint-disable no-unsafe-optional-chaining */
import { Line } from 'rc-progress';
import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import useLectureStore from '../../hooks/useLectureStore';
import useProgressStore from '../../hooks/useProgressStore';
import useSectionStore from '../../hooks/useSectionStore';
import percentageFormat from '../../utils/percentageFormat';
import { timeFormat } from '../../utils/TimeFormat';
import SubTitle from '../ui/SubTitle';
import Title from '../ui/Title';

const TitleWrapper = styled.div`
  padding: 1.5rem;
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  
  *{
    text-align: start;
    display: block;
  }
  
  tr{
    width: 100%;
  }

  th{
    padding-inline: 2rem;
    padding-block: 1.5rem;
    border-block: 1px solid #dee2e6;
    background: #f1f3f5;
  }  

  tbody{
    padding-inline: 2rem;
  }

  td{
    display: flex;
    margin-block: 1.5rem;
  }
`;

const Completed = styled.p`
  margin-inline-end: 1rem;
`;

const LectureDescription = styled.div`
  p:first-child{
    margin-block-end: .5rem;
  }
`;

export default function CurriCulumTab({ onTabOff }) {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { courseId } = state;

  const sectionStore = useSectionStore();
  const courseStore = useCourseStore();
  const progressStore = useProgressStore();
  const lectureStore = useLectureStore();

  useEffect(() => {
    progressStore.fetchProgresses();
    sectionStore.fetchSections();
    lectureStore.fetchLecturesByCourseId({ courseId });
  }, []);

  const handleNavigate = (lectureId) => {
    onTabOff(false);
    navigate(`/courses/${courseId}/lectures/${lectureId}`, {
      state: { courseId, lectureId },
    });
  };

  return (
    <article>
      <TitleWrapper>
        <Title>
          목차
        </Title>
        <SubTitle>
          <small>
            {courseStore.course.title}
          </small>
        </SubTitle>
        <p>
          진도율:
          {' '}
          {progressStore.progresses
            .filter((progress) => progress.status === 'completed').length}
          강/
          {lectureStore.lectures
            .filter((lecture) => lecture.courseId === +courseId)
            .length}
          강
          (
          {percentageFormat(progressStore.progresses
            .filter((progress) => progress.status === 'completed').length
        / lectureStore.lectures
          .filter((lecture) => lecture.courseId === +courseId)
          .length)}
          %
          ) | 시간:
          {' '}
          {
            timeFormat.getMinutes({
              seconds: lectureStore.lectures
                .filter((lecture) => (
                  progressStore.progresses
                    .filter((progress) => progress.status === 'completed')
                    .reduce((acc, progress) => (acc || progress.lectureId === lecture.id), false)
                ))
                .reduce((prevTime, lecture) => (
                  prevTime + 60 * lecture.lectureTime.minute + lecture.lectureTime.second
                ), 0),
            })
          }
          분/
          {timeFormat.getMinutes({
            seconds: lectureStore.lectures
              .filter((lecture) => lecture.courseId === +courseId)
              .reduce((prevTime, lecture) => (
                prevTime + 60 * lecture.lectureTime.minute + lecture.lectureTime.second
              ), 0),
          })}
          분
        </p>
        <Line
          strokeColor="#02c471"
          percent={percentageFormat(progressStore.progresses
            .filter((progress) => progress.status === 'completed').length
            / lectureStore.lectures
              .filter((lecture) => lecture.courseId === +courseId)
              .length)}
        />
      </TitleWrapper>
      <Table>
        {sectionStore.sections
          .filter((section) => section.courseId === +courseId)
          .map((section) => (
            <Fragment key={section.id}>
              <thead>
                <tr>
                  <th>
                    {section.title}
                  </th>
                </tr>
              </thead>
              <tbody>
                {lectureStore.lectures
                  .filter((lecture) => lecture.sectionId === section.id)
                  .map((lecture) => (
                    <tr key={lecture.id} onClick={() => handleNavigate(lecture.id)}>
                      <td>
                        <Completed>
                          {progressStore.progresses
                            .find((progress) => progress.lectureId === lecture.id)
                            .status === 'completed' ? '✅' : '❎' }
                        </Completed>
                        <LectureDescription>
                          <p>
                            {lecture.title}
                          </p>
                          <p>
                            ▶️
                            {lecture.lectureTime.minute}
                            분
                          </p>
                        </LectureDescription>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Fragment>
          ))}
      </Table>
    </article>
  );
}
