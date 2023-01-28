import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline-end: 2rem;
  width: 11rem;

  a{
    font-size: 1.2rem;
    display: block;
    padding-inline-start: 1rem;
    padding-block: .7rem;
  }
`;

const Category = styled.h2`
  font-size: 1rem;
  margin-block: 1rem;
  color: #e3e3e3;
`;

export default function InstructorTab() {
  return (
    <Container>
      <nav>
        <Category>
          대시보드
        </Category>
        <Link to="/instructor">
          대시보드
        </Link>
        <Category>
          새 강의 만들기
        </Category>
        <Link to="/create_course">
          새 강의 만들기
        </Link>
        <Category>
          강의관리
        </Category>
        <ul>
          <li>
            <Link to="/instructor/courses">
              강의 관리
            </Link>
          </li>
          <li>
            <Link to="/instructor/questions">
              강의 질문 관리
            </Link>
          </li>
          <li>
            <Link to="/instructor/ratings">
              수강평 리스트
            </Link>
          </li>
          <li>
            <Link to="/instructor/profits">
              수익 확인
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
