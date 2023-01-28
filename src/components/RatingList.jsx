import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import { dateFormat } from '../utils/DateFormat';

const Container = styled.div`
  flex: 1;
`;

const Table = styled.table`
  display: block;
  padding-block: 2rem;

  thead, tbody{
    display: block;
    width: 100%;
  }

  th{
    text-align: start;
    font-size: 1.3rem;
    font-weight: 500;
    color: gray;
  }

  tr{
    display: grid;
    grid-template-columns: 2fr 2fr repeat(3, 1fr);
    padding: 1rem;
    align-items: center;
    border: 1px solid #D3DADD;
    border-collapse: collapse;
  }

  td{
    >div{
      display: flex;
      align-items: center;
    }
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
    <Container>
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
                      ?.title}
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
                  {dateFormat.defaultFormat(rating.createdAt)}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
