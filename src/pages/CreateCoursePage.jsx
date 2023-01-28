import styled from 'styled-components';
import CreateCourseBanner from '../components/banners/CreateCoursebanner';
import CreateCourseTab from '../components/tabs/CreateCourseTab';
import Container from '../components/ui/Container';
import Padding from '../components/ui/Padding';

const Main = styled.article`
  padding-block: 2.5rem;
  background: #f5f5f5;
  flex: 1;

  > div{
    display: flex;
  }
`;

export default function CreateCoursePage({ Component }) {
  return (
    <Container>
      <CreateCourseBanner />
      <Main>
        <Padding>
          <CreateCourseTab />
          <Component />
        </Padding>
      </Main>
    </Container>
  );
}
