import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';

const Table = styled.table`
  margin-top: 2rem;

  td{
    padding: 2rem;
  }
`;

export default function RatingList() {
  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();

  const handleChangeFilter = (event) => {
    const filter = { courseId: event.target.value };

    ratingStore.fetchRatingsByInstructorId(filter);
  };

  useEffect(() => {
    ratingStore.fetchRatingsByInstructorId();
    courseStore.fetchUploadedCourses();
  }, []);

  return (
    <div>
      <label hidden htmlFor="select-course">강의이름</label>
      <select id="select-course" onChange={handleChangeFilter}>
        <option value={0}>전체강의</option>
        {courseStore.uploadedCourses
          .map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
      </select>
      <Table>
        <thead>
          <tr>
            <th>강의명</th>
            <th>작성자</th>
            <th>평점</th>
            <th>내용</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {ratingStore.ratings
            .map((rating) => (
              <tr key={rating.id}>
                <td>
                  <Link to={`/courses/${rating.courseId}`}>
                    {courseStore.uploadedCourses
                      .find((course) => course.id === rating.courseId)
                      .title}
                  </Link>
                </td>
                <td>
                  {rating.author}
                </td>
                <td>
                  {rating.rating}
                </td>
                <td>
                  {rating.content}
                </td>
                <td>
                  {rating.createdAt}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
