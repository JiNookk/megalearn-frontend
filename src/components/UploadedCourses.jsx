import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useInquiryStore from '../hooks/useInquiryStore';
import usePaymentStore from '../hooks/usePaymentStore';
import useRatingStore from '../hooks/useRatingStore';
import averageFormat from '../utils/averageFormat';
import CourseDeleteModal from './modals/CourseDeleteModal';

// const Table = styled.table`
//   margin-top: 2rem;

//   td{
//     padding: .5rem 1rem;
//   }
// `;

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
    font-size: 1.1rem;
    font-weight: 500;
    color: gray;
  }

  tr{
    display: grid;
    grid-template-columns: 1fr 2fr repeat(6, 1fr);
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

const Image = styled.img`
  width: 60px;
  height: 60px;
`;

export default function UploadedCourses() {
  const [isModal, setIsModal] = useState(false);
  const [courseId, setCourseId] = useState();

  const courseStore = useCourseStore();
  const inquiryStore = useInquiryStore();
  const ratingStore = useRatingStore();
  const paymentStore = usePaymentStore();

  const status = {
    processing: '임시저장',
    submit: '제출',
    approved: '공개',
  };

  const handleChangeStatus = (event) => {
    const filter = event.target.value;

    courseStore.fetchUploadedCourses({ filter });
  };

  const handleDeleteCourse = (id) => {
    setCourseId(id);

    setIsModal(true);
  };

  useEffect(() => {
    courseStore.fetchUploadedCourses();
    paymentStore.fetchPayments();
    ratingStore.fetchRatings();
    inquiryStore.fetchInquiriesByInstructorId();
  }, []);

  return (
    <Container>
      <label hidden htmlFor="select-status">강의 상태</label>
      <select id="select-status" onChange={handleChangeStatus}>
        <option value="all">전체상태</option>
        <option value="processing">임시저장</option>
        <option value="submit">제출</option>
        <option value="approved">공개</option>
      </select>
      <Table>
        <thead>
          <tr>
            <th>
              이미지
            </th>
            <th>
              강의명
            </th>
            <th>
              평점
            </th>
            <th>
              총 수강생
            </th>
            <th>
              질문
            </th>
            <th>
              총 수입
            </th>
            <th>
              상태
            </th>
            <th>
              관리
            </th>
          </tr>
        </thead>
        <tbody>
          {courseStore.uploadedCourses
            .map((course) => (
              <tr key={course.id}>
                <td>
                  <Image src={course.coverImage || '/assets/images/test.jpg'} alt="course" />
                </td>
                <td>
                  <Link to={`/courses/${course.id}`}>
                    {course.title}
                  </Link>
                </td>
                <td>
                  <Link to={`/courses/${course.id}#reviews`}>
                    {averageFormat(ratingStore.ratings
                      .filter((rating) => rating.courseId === course.id)) || 0}
                  </Link>
                </td>
                <td>
                  {paymentStore.payments
                    .filter((payment) => payment.courseId === course.id)
                    .length}
                </td>
                <td>
                  <Link to={`/courses/${course.id}/inquiries`}>
                    {inquiryStore.inquiryPosts
                      .filter((inquiry) => inquiry.courseId === course.id)
                      .length}
                  </Link>
                </td>
                <td>
                  {paymentStore.payments
                    .filter((payment) => payment.courseId === course.id)
                    .reduce((acc, cur) => acc + cur.cost, 0)}
                </td>
                <td>
                  {status[course.status]}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    강의삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {isModal && (
        <CourseDeleteModal onIsModal={setIsModal} courseId={courseId} />
      )}
    </Container>
  );
}
