import { Link } from 'react-router-dom';

export default function MyCourses({ courses = [] }) {
  return (
    <ul>
      {courses.map((course) => (
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
