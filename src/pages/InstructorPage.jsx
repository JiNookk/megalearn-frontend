import { useState } from 'react';
import styled from 'styled-components';
import InstructorPanel from '../components/InstructorPanel';
import InstructorTab from '../components/tabs/InstructorTab';

const Container = styled.article`
  display: flex;
  
  height: 100%;

  padding-block-start: 3rem;

  background-color: rgb(245,245,245);
`;

export default function InstructorPage({ Component }) {
  const category = window.location.pathname.split('/')[2];

  const [title, setTitle] = useState('대시보드');

  if (category === 'question') {
    setTitle('강의 질문 관리');
  }

  return (
    <div>
      <InstructorPanel title={title} />
      <Container>
        <InstructorTab />
        <Component />
      </Container>
    </div>
  );
}
