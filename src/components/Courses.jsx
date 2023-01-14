import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import numberFormat from '../utils/numberFormat';

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 20px;
  `;
const Image = styled.img`
  width: 100px;
  height: 60px;
`;

export default function Courses() {
  const path = window.location.pathname.split('/')[2];

  const category = {
    '전체 강의': '',
    '개발 • 프로그래밍': '/it-programming',
    '보안 • 네트워크': '/it',
    '데이터 사이언스': '/data-science',
    '게임 개발': '/game-dev',
    크리에이티브: '/creative',
    '직무 • 마케팅': '/business',
    커리어: '/career',
    교양: '/life',
  };

  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();

  const getKey = (url) => Object.keys(category)
    .find((key) => category[key].substring(1) === url);

  return (
    <List>
      {courseStore.courses.length
        ? courseStore.courses
          .filter((course) => course.category === (getKey(path) || course.category))
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
          ))
        : (
          <li>
            <p>
              <strong>
                🙈 검색 결과가 없어요! 🙊
              </strong>
            </p>
            <p>
              필터를 다시 적용해보시거나 카테고리를 이동해보세요
            </p>
          </li>
        )}
    </List>
  );
}
