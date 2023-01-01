import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import usePaymentStore from '../hooks/usePaymentStore';
import { dateFormat } from '../utils/dateFormat';
import numberFormat from '../utils/numberFormat';

const Table = styled.table`
  margin-top: 2rem;

  td{
    padding: 2rem;
  }
`;

export default function Profits() {
  const paymentStore = usePaymentStore();
  const courseStore = useCourseStore();

  const handleChangeFilter = (event) => {
    const filter = { courseId: event.target.value };

    paymentStore.fetchPayments(filter);
  };

  useEffect(() => {
    paymentStore.fetchPayments();
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
            <th>
              강의명
            </th>
            <th>
              구매자
            </th>
            <th>
              수익
            </th>
            <th>
              구매일
            </th>
          </tr>
        </thead>
        <tbody>
          {paymentStore.payments
            .map((payment) => (
              <tr key={payment.id}>
                <td>
                  <Link to={`/courses/${payment.courseId}`}>
                    {courseStore.uploadedCourses
                      .find((course) => course.id === payment.courseId)
                      ?.title}
                  </Link>
                </td>
                <td>
                  {payment.purchaser}
                </td>
                <td>
                  {numberFormat(payment.cost)}
                  {' '}
                  원
                </td>
                <td>
                  {dateFormat.defaultFormat(payment.createdAt)}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}