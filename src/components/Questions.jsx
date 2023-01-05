import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useinquiryFilterFormStore from '../hooks/useInquiryFilterFormStore';
import useInquiryStore from '../hooks/useInquiryStore';
import useLectureStore from '../hooks/useLectureStore';

const Table = styled.table`
  margin-top: 2rem;

  td{
    padding: 2rem;
  }
`;

const Inquiry = styled.tr`
  border: 1px solid black;
`;

export default function Questions() {
  const courseStore = useCourseStore();
  const lectureStore = useLectureStore();
  const inquiryStore = useInquiryStore();

  const inquiryFilterFormStore = useinquiryFilterFormStore();

  const handleChangeType = (event) => {
    inquiryFilterFormStore.changeType(event.target.value);

    const filter = ['type', 'courseId', 'order'].reduce((acc, key) => ({
      ...acc,
      [key]: inquiryFilterFormStore[key],
    }), {});

    inquiryStore.fetchFilteredInquiries({ filter });
  };

  const handleChangeCourseId = (event) => {
    inquiryFilterFormStore.changeCourseId(event.target.value);

    const filter = ['type', 'courseId', 'order'].reduce((acc, key) => ({
      ...acc,
      [key]: inquiryFilterFormStore[key],
    }), {});

    inquiryStore.fetchFilteredInquiries({ filter });
  };

  const handleChangeOrder = (event) => {
    inquiryFilterFormStore.changeOrder(event.target.value);

    const filter = ['type', 'courseId', 'order'].reduce((acc, key) => ({
      ...acc,
      [key]: inquiryFilterFormStore[key],
    }), {});

    inquiryStore.fetchFilteredInquiries({ filter });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    courseStore.fetchUploadedCourses();
    inquiryStore.fetchInquiriesByInstructorId();
    lectureStore.fetchLecturesByInstructorId();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label hidden htmlFor="select-question-type">질문 타입</label>
        <select
          id="select-question-type"
          onChange={handleChangeType}
        >
          <option value="all">전체</option>
          <option value="unsolved">미해결 질문</option>
          <option value="unreplied">미답변 질문</option>
          <option value="solved">해결된 질문</option>
          <option value="replied">답변된 질문</option>
        </select>
        <label hidden htmlFor="select-course-name">강의 이름</label>
        <select
          id="select-course-name"
          onChange={handleChangeCourseId}
        >
          <option value="">전체강의</option>
          {courseStore.uploadedCourses
            .map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
        </select>
        <label hidden htmlFor="select-order">정렬</label>
        <select
          id="select-order"
          onChange={handleChangeOrder}
        >
          <option value="time">최신순</option>
          <option value="reply">최근 답변 순</option>
          <option value="like">추천순</option>
        </select>
        {/* <label hidden htmlFor="input-content">내용</label>
        <input id="input-content" type="text" />
        <button type="submit">검색</button> */}
      </form>
      <Table>
        <thead>
          <tr>
            <th>강의명</th>
            <th>수업명</th>
            <th>제목</th>
            <th>해결 여부</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {inquiryStore.inquiryPosts
            .map((inquiry) => (
              <Inquiry key={inquiry.id}>
                <td>
                  {courseStore.uploadedCourses
                    .find((course) => (lectureStore.lectures
                      .find((lecture) => lecture.id === inquiry.lectureId)
                      ?.courseId === course.id
                    ))?.title}
                </td>
                <td>
                  {lectureStore.lectures
                    .find((lecture) => lecture.id === inquiry.lectureId)
                    ?.title}
                </td>
                <td>
                  <Link to={`/inquiries/${inquiry.id}`}>
                    {inquiry.title}
                  </Link>
                </td>
                <td>{inquiry.status.solved === 'completed' ? '해결' : '미해결'}</td>
                <td>{inquiry.status.replied === 'completed' ? '답변' : '미답변'}</td>
              </Inquiry>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
