import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import useCourseStore from '../hooks/useCourseStore';
import useInquiryStore from '../hooks/useInquiryStore';
import useLectureStore from '../hooks/useLectureStore';
import usePaymentStore from '../hooks/usePaymentStore';
import useRatingStore from '../hooks/useRatingStore';
import Chart from '../utils/Chart';
import { dateFormat } from '../utils/dateFormat';

import percentageFormat from '../utils/percentageFormat';

const Container = styled.div`
  width: 100%;
  padding: 2rem;

  h2{
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Preview = styled.div`
  display: grid;
  grid: 170px 170px / 1fr 1fr 1fr;
  gap: 15px;
  margin-block-end: 2rem;
  width: 100%;

  article{
    border: 1px solid black;
    background-color: white;
  }

  article:nth-child(5){
    grid-area: 2 / 2 / 3 / 4;
  }
`;

const MonthlyRevenue = styled.div`
  display: grid;
  grid: 400px / 1fr 1fr;
  gap: 15px;
  width: 100%;

  margin-block-end: 2rem;

  article{
    border: 1px solid black;

    background-color: white;
  }
`;

const Category = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;

  display: inline-block;
`;

const UnRepliedInquiries = styled.article`
  width: 100%;
  height: 400px;
  background-color: white;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
            My Home
          </Category>
        </article>
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
            {percentageFormat(ratingStore.rating / 100)}
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
          {paymentStore.payments
            .reduce((cur, acc) => cur + acc.cost, 0)}
          원
        </article>
      </Preview>

      <h2>강의 수익</h2>
      <MonthlyRevenue>
        <article>
          <Category>
            이번 달 현황
          </Category>
          <Chart
            cost={paymentStore.monthlyProfit}
            ratioArray={paymentStore.recentPayments
              .map((payment) => ({
                name: payment.courseTitle,
                value: payment.cost,
              }))}
          />
        </article>
        <article>
          <Category>
            강의 수익 분포
          </Category>
        </article>
      </MonthlyRevenue>
      <UnRepliedInquiries>
        <TextContainer>
          <Category>
            미답변 질문
          </Category>
          <Link to="/instructor/questions">
            전체 질문 보기
          </Link>
        </TextContainer>
        <ul>
          {inquiryStore.inquiryPosts
            .filter((inquiry) => inquiry.status.replied === 'processing')
            .map((inquiry) => (
              <li key={inquiry.id}>
                <h3>
                  {// 이 부분 너무 이상한 것 같다.
                    courseStore.uploadedCourses
                      .find((course) => {
                        const found = lectureStore.lectures
                          .find((lecture) => lecture.id === inquiry.lectureId);
                        return course.id === found?.courseId;
                      })
                      ?.title
                  }
                  {' '}
                  -
                  {' '}
                  {lectureStore.lectures
                    .find((lecture) => lecture.id === inquiry.lectureId)
                    ?.title}
                </h3>
                <TextContainer>
                  <p>{inquiry.publisher}</p>
                  <p>
                    {inquiry.title}
                    {'  '}
                    {dateFormat.fromNow(inquiry.publishTime)}
                  </p>
                </TextContainer>
              </li>
            ))}
        </ul>
      </UnRepliedInquiries>
    </Container>
  );
}
