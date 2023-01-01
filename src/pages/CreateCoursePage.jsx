import styled from 'styled-components';
import CreateCourseBanner from '../components/banners/CreateCoursebanner';
import CreateCourseTab from '../components/tabs/CreateCourseTab';

const Container = styled.article`
  display: flex;

  padding-inline:  1rem;
  padding-block-start: 2rem;

  background: #f5f5f5;
`;

export default function CreateCoursePage({ Component }) {
  return (
    <div>
      <CreateCourseBanner />

      <Container>
        <CreateCourseTab />
        <Component />
      </Container>
    </div>
  );
}
