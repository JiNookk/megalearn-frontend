import moment from 'moment';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import useCourseStore from '../hooks/useCourseStore';
import useInquiryStore from '../hooks/useInquiryStore';
import useLectureStore from '../hooks/useLectureStore';
import usePaymentStore from '../hooks/usePaymentStore';
import useRatingStore from '../hooks/useRatingStore';
import averageFormat from '../utils/averageFormat';
import WeeklyBarChart from '../utils/BarChart';
import Chart from '../utils/Chart';
import { dateFormat } from '../utils/DateFormat';
import numberFormat from '../utils/numberFormat';

import percentageFormat from '../utils/percentageFormat';

const Container = styled.div`
  width: 100%;
  padding-inline-end: 2rem;
  padding-block: 2rem;

  h2{
    font-size: 2rem;
    font-weight: bold;
  }
  `;

const Preview = styled.div`
  display: grid;
  grid: 170px 170px / 1fr 1fr;
  gap: 15px;
  margin-block-end: 2rem;
  width: 100%;
  
  article{
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #D3DADD;
    background-color: white;

    >div{
      padding: .7rem;
    }
    
    >div:last-child{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
      color: #d9d9d9;
    }
  }
  `;

const MonthlyRevenue = styled.div`
  display: grid;
  grid: 400px / 1fr 1fr;
  gap: 15px;
  width: 100%;
  margin-block-end: 2rem;
  
  >article{
    display: flex;
    flex-direction: column;
  }

  article{
    border: 1px solid #d3dadd;
    border-radius: .5rem;
    background-color: white;

    > div{
      padding: .7rem;
    }

    p{
      font-size:2.5rem;
      font-weight: bold;
      margin-block: 1.5rem;
      text-align: center;
      color: #d9d9d9;
    }
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: 600;
  border-bottom: 1px solid #D3DADD;

  small{
    font-size: 1rem;
    display: flex;
    align-items: end;
  }
  `;

const UnRepliedInquiries = styled.article`
  border: 1px solid #D3DADD;
  border-radius: .5rem;
  background-color: white;
  
  > *{
    padding: .7rem
  }
`;

const WeeklyBarChartWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #d3ddaa;
  
  thead{
    th:nth-child(1){
      width: 20%;
    }
    th:nth-child(2){
      width: 30%;
    }
    th:nth-child(3){
      width: 50%;
    }
  }

  th{
    font-weight: bold;
  }

  th, td{
    padding: .7rem;
    border: 1px solid #d3ddaa;
    text-align: start;
  }

  td:nth-child(3){
    text-decoration: underline;
  }
`;

export default function InstructorDashBoard() {
  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();
  const paymentStore = usePaymentStore();
  const inquiryStore = useInquiryStore();
  const lectureStore = useLectureStore();

  useEffect(() => {
    courseStore.fetchUploadedCourses();
    ratingStore.fetchRating();
    ratingStore.fetchRatings();
    paymentStore.fetchPayments();
    paymentStore.fetchMonthlyPayments();
    inquiryStore.fetchInquiriesByInstructorId();
    lectureStore.fetchLecturesByInstructorId();
  }, []);

  return (
    <Container>
      <Preview>
        <article>
          <Category>
            총 강의 수
          </Category>
          <div>
            {courseStore.uploadedCourses?.length || 0}
            개
          </div>
        </article>
        <article>
          <Category>
            평점
          </Category>
          <div>
            {averageFormat(ratingStore.ratings)}
            점
          </div>
        </article>
        <article>
          <Category>
            총 수강생 수
          </Category>
          <div>
            {paymentStore.payments.length}
            명
          </div>
        </article>
        <article>
          <Category>
            강의 총 수익
          </Category>
          <div>
            {numberFormat(paymentStore.payments
              .reduce((cur, acc) => cur + acc.cost, 0))}
            원
          </div>
        </article>
      </Preview>
      <h2>수강 데이터</h2>
      <MonthlyRevenue>
        <article>
          <Category>
            이번 달 현황
          </Category>
          <div>
            <p>
              {paymentStore.monthlyProfit}
              원
            </p>
            <Chart
              cost={paymentStore.monthlyProfit}
              ratioArray={paymentStore.recentPayments
                .filter((payment) => payment.cost > 0)
                .map((payment) => ({
                  name: payment.courseTitle,
                  value: payment.cost,
                }))}
            />
          </div>
        </article>
        <UnRepliedInquiries>
          <Category>
            미답변 질문
            <small>
              <Link to="/instructor/questions">
                {'전체 질문 보기 >'}
              </Link>
            </small>
          </Category>
          <div>
            {inquiryStore.inquiryPosts
              .filter((inquiry) => inquiry.status.replied === 'processing')
              .length ? (
                <Table>
                  <thead>
                    <tr>
                      <th>
                        강의명
                      </th>
                      <th>
                        질문 등록일
                      </th>
                      <th>
                        질문 제목
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiryStore.inquiryPosts
                      .filter((inquiry) => inquiry.status.replied === 'processing')
                      .map((inquiry) => (
                        <tr key={inquiry.id}>
                          <td>
                            {// 이 부분 너무 이상한 것 같다.
                              courseStore.uploadedCourses
                                .find((course) => {
                                  const found = lectureStore.lectures
                                    .find((lecture) => lecture.id === inquiry.lectureId);
                                  return course.id === found?.courseId;
                                })
                                ?.title
                            }
                          </td>
                          <td>
                            {dateFormat.slashFormat(inquiry.publishTime)}
                          </td>
                          <td>
                            <Link to={`/inquiries/${inquiry.id}`}>
                              {inquiry.title}
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              ) : (
                <p>
                  모든 질문이 해결되었습니다.
                </p>
              )}
          </div>
        </UnRepliedInquiries>
      </MonthlyRevenue>
    </Container>
  );
}
