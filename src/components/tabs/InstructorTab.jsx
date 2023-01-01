import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem;
`;

export default function InstructorTab() {
  return (
    <Container>
      <Link to="/instructor">
        대시보드
      </Link>
      <Link to="/create_course">
        새 강의 만들기
      </Link>
      <Link to="/instructor/courses">
        강의 관리
      </Link>
      <Link to="/instructor/questions">
        강의 질문 관리
      </Link>
      <Link to="/instructor/ratings">
        수강평 리스트
      </Link>
      <Link to="/instructor/profits">
        수익 확인
      </Link>
    </Container>
  );
}
