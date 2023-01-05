import styled from 'styled-components';
import useCourseStore from '../../hooks/useCourseStore';
import useLectureStore from '../../hooks/useLectureStore';
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

  margin-block-start: 6rem;
  border: 1px solid #f1f3f5;  
  border-radius: .5rem;
`;

const CourseInformation = styled.ul`
  list-style: disc;
  width: 100%;
  padding: 2rem 2rem;
  background: #f8f9fa;
`;

const PurchaseWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  p{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  button{
    padding: 1rem 5rem;
    margin-block-start: .5rem;
  }
`;

export default function PurchaseBanner() {
  const courseId = window.location.pathname.split('/')[2];

  const courseStore = useCourseStore();
  const lectureStore = useLectureStore();

  return (
    <div>
      <Panel>
        <PurchaseWindow>
          <p>
            {numberFormat(courseStore.course.price)}
            원
          </p>
          {courseStore.course.isPurchased ? (
            <SecondaryButton>
              이어 학습하기
            </SecondaryButton>
          ) : (
            <>
              <SecondaryButton>
                수강신청 하기
              </SecondaryButton>
              <PrimaryButton>
                바구니에 담기
              </PrimaryButton>
            </>
          )}
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
