import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import usePaymentStore from '../../hooks/usePaymentStore';
import useProgressStore from '../../hooks/useProgressStore';
import useRatingStore from '../../hooks/useRatingStore';
import percentageFormat from '../../utils/percentageFormat';
import Banner from '../ui/Banner';

const Description = styled(Banner)`
  justify-content: center;
`;

const Continue = styled.div`
  margin-inline-end: 2rem;

  width: 530px;
  height: 360px;

  background: url('/assets/images/test.jpg');
  background-size: cover;

  *{
    color: white;
  }

  a{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h2`
  background: none;
  border: none;

  font-size: 1.5rem;
  font-weight: bold;

  margin-block: 1rem;
`;

const Image = styled.img`
  display: block;

  width: 40px;
  height: 40px;
`;

export default function CourseBanner() {
  const courseId = window.location.pathname.split('/')[2];

  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();
  const paymentStore = usePaymentStore();
  const progressStore = useProgressStore();

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
    ratingStore.fetchRatings();
    paymentStore.fetchPayments();
    progressStore.fetchProgresses();
  }, []);

  return (
    <Description>
      <Continue>
        <Link to={`/courses/${courseId}/lectures/1`}>
          <Image src="/assets/images/start.png" alt="start" />
          <Title>
            이어 학습하기
          </Title>
          <p>
            진도율:
            {' '}
            {percentageFormat(progressStore.progresses
              .filter((progress) => progress.courseId === +courseId)
              .filter((progress) => progress.status === 'completed')
              .length
            / progressStore.progresses
              .filter((progress) => progress.courseId === +courseId)
              .length)}
            {' '}
            %
            {' ('}
            {progressStore.progresses
              .filter((progress) => progress.courseId === +courseId)
              .filter((progress) => progress.status === 'completed')
              .length}
            /
            {progressStore.progresses
              .filter((progress) => progress.courseId === +courseId)
              .length}
            강)
          </p>
        </Link>
      </Continue>
      <div>
        <p>
          분야:
          {' '}
          {courseStore.course.category}
        </p>
        <Title>{courseStore.course.title}</Title>
        <p>
          별점:
          {' '}
          {(ratingStore.ratings
            .filter((rating) => rating.courseId === +courseId)
            .reduce((acc, cur) => acc + cur.rating, 0)
            / ratingStore.ratings
              .filter((rating) => rating.courseId === +courseId)
              .length || 0)
            .toFixed(2)}
        </p>
        <p>
          수강생:
          {' '}
          {paymentStore.payments
            .filter((payment) => payment.courseId === +courseId)
            .length}
          명
        </p>
        <p>
          지식공유자:
          {' '}
          {courseStore.course.instructor}
        </p>
        <p>
          해시태그:
          {' '}
          {courseStore.course.hashTags?.join(', ')}
        </p>
      </div>
    </Description>
  );
}
