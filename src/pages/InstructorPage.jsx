import styled from 'styled-components';
import InstructorBanner from '../components/banners/InstructorBanner';
import InstructorTab from '../components/tabs/InstructorTab';

const Main = styled.article`
  display: flex;
  
  height: 100%;

  padding-block-start: 3rem;

  background-color: rgb(245,245,245);
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
    <div>
      <InstructorBanner title={titles[category] || '대시보드'} />
      <Main>
        <InstructorTab />
        <Component />
      </Main>
    </div>
  );
}
