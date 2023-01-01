import { Link } from 'react-router-dom';
import useCourseStore from '../hooks/useCourseStore';

export default function MyCourses() {
  const courseStore = useCourseStore();

  return (
    <ul>
      {courseStore.myCourses.map((course) => (
        <Link to={`/courses/${course.id}`} key={course.id}>
          <img src={course.imagePath} alt="course-thumbnail" />
          <p>{course.title}</p>
          <p>
            진행률:
            {' '}
            {course.progress}
            %
          </p>
        </Link>
      ))}
    </ul>
  );
}
