import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/ui/Container';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import numberFormat from '../utils/numberFormat';

const Image = styled.img`
  width: 100px;
  height: 60px;
`;

export default function CoursesPage() {
  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();

  useEffect(() => {
    courseStore.fetchCourses();
    ratingStore.fetchRatings();
  }, []);

  return (
    <Container>
      <ul>
        {courseStore.courses
          .map((course) => (
            <li key={course.id}>
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
      </ul>
    </Container>
  );
}
