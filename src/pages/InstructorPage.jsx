import styled from 'styled-components';
import DefaultBanner from '../components/banners/DefaultBanner';
import InstructorTab from '../components/tabs/InstructorTab';
import Padding from '../components/ui/Padding';

const Container = styled.div`
  flex: 1;
  display  : flex;
  flex-direction: column;
`;

const Main = styled.article`
  flex: 1;
  padding-block-start: 2.5rem;
  background-color: rgb(245,245,245);

  >div{
    display: flex;
  }
`;

export default function InstructorPage({ Component }) {
  const category = window.location.pathname.split('/')[2];

  const titles = {
    courses: '강의 관리',
    questions: '강의 질문 관리',
    ratings: '내 강의 수강평',
    profits: '월별수입',
  };

  return (
    <Container>
      <DefaultBanner title={titles[category] || '대시보드'} />
      <Main>
        <Padding>
          <InstructorTab />
          <Component />
        </Padding>
      </Main>
    </Container>
  );
}
