import styled from 'styled-components';
import CreateCourseBanner from '../components/banners/CreateCoursebanner';
import CreateCourseTab from '../components/tabs/CreateCourseTab';
import Container from '../components/ui/Container';

const Main = styled.article`
  display: flex;

  padding-inline:  1rem;
  padding-block-start: 2rem;

  background: #f5f5f5;
`;

export default function CreateCoursePage({ Component }) {
  return (
    <Container>
      <CreateCourseBanner />

      <Main>
        <CreateCourseTab />
        <Component />
      </Main>
    </Container>
  );
}
