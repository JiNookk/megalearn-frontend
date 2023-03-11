import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';
import usePaymentStore from '../hooks/usePaymentStore';
import useSectionStore from '../hooks/useSectionStore';
import { timeFormat } from '../utils/TimeFormat';

const Container = styled.article`
  border: 1px solid #e8ecef;
  margin-block: 2rem;
  padding: 3rem 2rem;
`;

const Title = styled.div`
  display: flex;

  margin-block-end: 4rem;

  h2{
    font-size: 1.4rem;
    font-weight: bold;
  }
  p{
    margin-inline: 1rem;
    color: #adb5bd;
  }
`;

const Table = styled.table`
  display: block;
  margin-block: 2rem;

  tbody{
    display: block;
    width: 100%;
  }

  tr{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: .5rem;
    border: 1px solid #E4E3E5;
  }

  td{
    padding: 1rem;
  }
`;

const Section = styled.tr`
  font-weight: bold;
  background: #F8F9FA;
`;

const Lecture = styled.tr`
  td{
    width: 100%;
  }

  a{
    display: flex;
    justify-content: space-between;
  }
`;

const CourseLink = styled(Link)`
pointer-events: ${(props) => (props.payments
    .filter((payment) => payment.courseId === +props.courseId)
    .length ? 'all' : 'none')};
`;

export default function CurriCulum() {
  const courseId = window.location.pathname.split('/')[2];

  const sectionStore = useSectionStore();
  const lectureStore = useLectureStore();
  const paymentStore = usePaymentStore();

  useEffect(() => {
    sectionStore.fetchSectionsByCourseId({ courseId });
    lectureStore.fetchLecturesByCourseId({ courseId });
    paymentStore.fetchMyPayments();
  }, []);

  return (
    <Container id="curriculum">
      <Title>
        <h2>커리큘럼</h2>
        <p>
          총
          {' '}
          {lectureStore.lectures.length}
          {' '}
          개
        </p>
      </Title>
      <Table>
        <tbody>
          {sectionStore.sections
            .map((section, i) => (
              <Fragment key={section.id}>
                <Section>
                  <td>
                    섹션
                    {' '}
                    {i}
                    .
                    {' '}
                    {section.title}
                  </td>
                  <td>
                    {lectureStore.lectures
                      .filter((lecture) => lecture.sectionId === section.id)
                      .length}
                    강•
                    {timeFormat.getMinutes({
                      seconds: lectureStore.lectures
                        .filter((lecture) => lecture.sectionId === section.id)
                        .reduce((acc, lecture) => (
                          acc + lecture.lectureTime.minute * 60 + lecture.lectureTime.second
                        ), 0),
                    })}
                    분
                  </td>
                </Section>
                {lectureStore.lectures
                  .filter((lecture) => lecture.sectionId === section.id)
                  .map((lecture) => (
                    <Lecture key={lecture.id}>
                      <td>
                        <CourseLink
                          courseId={courseId}
                          payments={paymentStore.payments}
                          to={`/courses/${courseId}/lectures/${lecture.id}`}
                        >
                          <p>
                            {lecture.title}
                          </p>
                          <p>
                            {lecture.lectureTime.minute}
                            :
                            {lecture.lectureTime.second}
                          </p>
                        </CourseLink>
                      </td>
                    </Lecture>
                  ))}
              </Fragment>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
