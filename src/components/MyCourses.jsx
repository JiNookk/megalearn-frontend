import { Link } from 'react-router-dom';
import useCoursesStore from '../hooks/useCoursesStore';

export default function MyCourses() {
  const coursesStore = useCoursesStore();

  return (
    <ul>
      {coursesStore.myCourses.map((course) => (
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
