import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';
import useSectionStore from '../hooks/useSectionStore';

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
    border: 1px solid #e8ecef;
  }

  td{
    padding: 1rem;
  }
`;

const Section = styled.tr`
  background: #f8f9fa;
`;

export default function CurriCulum() {
  const courseId = window.location.pathname.split('/')[2];

  const sectionStore = useSectionStore();
  const lectureStore = useLectureStore();

  useEffect(() => {
    sectionStore.fetchSectionsByCourseId({ courseId });
    lectureStore.fetchLecturesByCourseId({ courseId });
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
                    강
                  </td>
                </Section>
                {lectureStore.lectures
                  .filter((lecture) => lecture.sectionId === section.id)
                  .map((lecture) => (
                    <tr key={lecture.id}>
                      <td>
                        <Link to={`/courses/${courseId}/lectures/${lecture.id}`}>
                          {lecture.title}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </Fragment>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
