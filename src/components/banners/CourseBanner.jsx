import { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import usePaymentStore from '../../hooks/usePaymentStore';
import useProgressStore from '../../hooks/useProgressStore';
import useRatingStore from '../../hooks/useRatingStore';
import percentageFormat from '../../utils/percentageFormat';
import Banner from '../ui/Banner';
import Padding from '../ui/Padding';

const Description = styled(Banner)`
  >div{
    display: flex;
    align-items: center;
  }
`;

const Continue = styled.div`
  margin-inline-end: 4rem;
  border-radius: 1rem;
  width: 530px;
  height: 360px;
  background: url(${(props) => (props.coverImage ? props.coverImage : '/assets/images/test.jpg')});
  background-size: 100% 100%;

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
  font-size: 1.5rem;
  font-weight: bold;
  margin-block: 1rem 2rem;
  border: none;
  background: none;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: .7rem;

  > div:first-child{
    margin-right: .5rem;
  }

  > p:nth-child(2){
    margin-right: 1rem;
  }
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
    paymentStore.fetchAllPayments();
    progressStore.fetchProgresses();
  }, []);

  return (
    <Description>
      <Padding>
        <Continue coverImage={courseStore.course.coverImage}>
          <Link to={`/courses/${courseId}/lectures/${progressStore.progresses
            .filter((progress) => progress.courseId === +courseId)[0]
            ?.lectureId}`}
          >
            {courseStore.course.isPurchased ? (
              <>
                <Title>
                  이어 학습하기
                </Title>
                <Image src="/assets/images/start.png" alt="start" />
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
              </>
            ) : null}
          </Link>
        </Continue>
        <div>
          <p>
            분야:
            {' '}
            {courseStore.course.category}
          </p>
          <Title>{courseStore.course.title}</Title>
          <Rating>
            <ReactStars
              value={+(ratingStore.ratings
                .filter((rating) => rating.courseId === +courseId)
                .reduce((acc, cur) => acc + cur.rating, 0)
                / ratingStore.ratings
                  .filter((rating) => rating.courseId === +courseId)
                  .length || 0)
                .toFixed(2)}
              edit={false}
            />
            {' '}
            <p>
              (
              {(ratingStore.ratings
                .filter((rating) => rating.courseId === +courseId)
                .reduce((acc, cur) => acc + cur.rating, 0)
            / ratingStore.ratings
              .filter((rating) => rating.courseId === +courseId)
              .length || 0)
                .toFixed(2)}
              )
            </p>
            <p>
              {ratingStore.ratings
                .filter((rating) => rating.courseId === +courseId)
                .length}
              개의 수강평
            </p>
            <p>
              •
              <strong>
                {paymentStore.wholePayments
                  .filter((payment) => payment.courseId === +courseId)
                  .length}
                명
              </strong>
              의 수강생
            </p>
          </Rating>
          <p>
            {courseStore.course.instructor}
          </p>
        </div>
      </Padding>
    </Description>
  );
}
