import useCourseStore from '../hooks/useCourseStore';

export default function Course({ handleNavigate }) {
  const courseStore = useCourseStore();

  const { recentlySeenLectureId: lectureId } = courseStore.course;

  const handleClick = () => {
    handleNavigate({ lectureId });
  };

  return (
    <div>
      <article>
        <button type="button" onClick={handleClick}>
          이어 학습하기
        </button>
        <p>
          분야:
          {' '}
          {courseStore.course.category}
        </p>
        <p>{courseStore.course.title}</p>
        <p>
          별점:
          {' '}
          {courseStore.course.stars}
        </p>
        <p>
          수강생:
          {' '}
          {courseStore.course.studentCount}
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
      </article>
    </div>
  );
}
