/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/ui/Container';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  
`

const Category = styled.ul`
  li{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid #e4e4e4;
    background: #fafafa;
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
`;
const Image = styled.img`
  width: 100px;
  height: 60px;
`;

export default function CoursesPage() {
  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();

  const handleSearchContent = () => {
    //
  };

  useEffect(() => {
    courseStore.fetchCourses();
    ratingStore.fetchRatings();
  }, []);

  return (
    <Container>
      <Category>
        {['전체 강의', '개발 • 프로그래밍', '보안 • 네트워크', '데이터 사이언스', '게임 개발',
          '크리에이티브', '직무 • 마케팅', '커리어', '교양']
          .map((item, i) => (
            <li key={i}>
              <p>
                {item}
              </p>
              <p>
                {'>'}
              </p>
            </li>
          ))}
      </Category>
      <div>
        <h2>
          전체 강의
        </h2>
        <div>
          <label hidden htmlFor="input-content">강의 검색</label>
          <input id="input-content" type="text" />
          <button type="button" onClick={handleSearchContent}>검색</button>
        </div>
        <div>
          <label hidden htmlFor="input-content">강의 검색</label>
          <input id="input-content" type="text" />
          <button type="button" onClick={handleSearchContent}>검색</button>
          <ul>
            {['HTML/CSS', 'JavaScript', 'Java', '객체지향', 'React', 'Spring',
              'Python', 'Node.js', '머신러닝']
              .map((language, i) => (
                <li key={i}>
                  {language}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <ul>
            {['전체', '무료', '유료']
              .map((language, i) => (
                <li key={i}>
                  {language}
                </li>
              ))}
          </ul>
          <ul>
            {['입문', '초급', '중급이상']
              .map((language, i) => (
                <li key={i}>
                  {language}
                </li>
              ))}
          </ul>
        </div>
        <List>
          {courseStore.courses
            .map((course) => (
              <li key={course.id} className="item">
                <Link to={`/courses/${course.id}`}>
                  <Image src="/assets/images/test.jpg" alt="course-items" />
                  <h3>{course.title}</h3>
                  <p>{course.instructor}</p>
                  <p>
                    {(ratingStore.ratings
                      .filter((rating) => rating.courseId === course.id)
                      .reduce((acc, cur) => acc + cur.rating, 0)
                / ratingStore.ratings
                  .filter((rating) => rating.courseId === course.id)
                  .length || 0)
                      .toFixed(2) }
                  </p>
                  <p>
                    ₩
                    {numberFormat(course.price)}
                  </p>
                </Link>
              </li>
            ))}
        </List>
      </div>
    </Container>
  );
}
