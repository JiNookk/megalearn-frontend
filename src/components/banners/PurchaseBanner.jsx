import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useCartStore from '../../hooks/useCartStore';
import useCourseStore from '../../hooks/useCourseStore';
import useLectureStore from '../../hooks/useLectureStore';
import useLikeStore from '../../hooks/useLikeStore';
import usePaymentStore from '../../hooks/usePaymentStore';
import useProgressStore from '../../hooks/useProgressStore';
import numberFormat from '../../utils/numberFormat';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

const Panel = styled.div`
  position: sticky;
  top: 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #D9D9D9;  
  border-radius: .5rem;
  `;

const PurchaseWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #D9D9D9;  

  p{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  button{
    padding: 1rem 4rem;
    margin-block-start: .5rem;
  }

  a{
    color:white;
  }
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-block-start: 1.5rem;

  button{
    border: none;
    background: none;
    padding: 1rem;
    margin: 0;
  }

  p{
    margin: 0 auto;
    font-size: 1rem;
  }
`;

const CourseInformation = styled.ul`
  list-style: disc;
  width: 100%;
  padding: 2rem 2rem;
  background: #f8f9fa;
`;

export default function PurchaseBanner() {
  const [accessToken] = useLocalStorage('accessToken');
  const navigate = useNavigate();

  const courseId = window.location.pathname.split('/')[2];

  const courseStore = useCourseStore();
  const lectureStore = useLectureStore();
  const cartStore = useCartStore();
  const likeStore = useLikeStore();
  const paymentStore = usePaymentStore();
  const progressStore = useProgressStore();

  const handleAddCourseToCart = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    cartStore.addItem({ productId: courseStore.course.id });
  };

  const handlePurchaseCourse = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    cartStore.addItem({ productId: courseStore.course.id });

    navigate('/carts');
  };

  const handleToggleLike = () => {
    likeStore.toggleLike({ id: likeStore.like.id });
  };

  useEffect(() => {
    cartStore.fetchCart();
    likeStore.fetchCourseLikes();
    likeStore.fetchMyCourseLike({ courseId });
    paymentStore.fetchMyPayments();
    progressStore.fetchProgresses();
  }, []);

  return (
    <div>
      <Panel>
        <PurchaseWindow>
          <p>
            {numberFormat(courseStore.course.price)}
            원
          </p>
          {paymentStore.payments
            .filter((payment) => payment.courseId === +courseId).length ? (
              <SecondaryButton>
                <Link to={`/courses/${courseId}/lectures/${progressStore.progresses
                  .filter((progress) => progress.courseId === +courseId)[0]
                  ?.lectureId}`}
                >
                  이어 학습하기
                </Link>
              </SecondaryButton>
            ) : (
              <>
                <SecondaryButton onClick={handlePurchaseCourse}>
                  {cartStore.cart.items
                    .filter((item) => item.productId === +courseId)
                    .length ? '수강 바구니로 이동' : '수강신청 하기'}
                </SecondaryButton>
                {!cartStore.cart.items
                  .filter((item) => item.productId === +courseId)
                  .length && (
                  <PrimaryButton onClick={handleAddCourseToCart}>
                    바구니에 담기
                  </PrimaryButton>
                )}
              </>
            )}
          <Like>
            <button type="button" onClick={handleToggleLike}>
              {likeStore.like.clicked ? '❤️' : '🤍'}
            </button>
            {' '}
            <p>
              {likeStore.likes
                .filter((like) => like.courseId === +courseId)
                .filter((like) => like.clicked)
                .length}
            </p>
          </Like>
        </PurchaseWindow>
        <CourseInformation>
          <li>
            지식공유자:
            {' '}
            {courseStore.course.instructor}
          </li>
          <li>
            총
            {' '}
            {lectureStore.lectures
              .filter((lecture) => lecture.courseId === +courseId)
              .length}
            개 수업
          </li>
          <li>
            난이도:
            {' '}
            {courseStore.course.level}
          </li>
        </CourseInformation>
      </Panel>
    </div>
  );
}
