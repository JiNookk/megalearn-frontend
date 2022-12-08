export default function Course({ course, handleNavigate }) {
  const { recentlySeenLectureId: lectureId } = course;

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
          {course.category}
        </p>
        <p>{course.title}</p>
        <p>
          별점:
          {' '}
          {course.stars}
        </p>
        <p>
          수강생:
          {' '}
          {course.studentCount}
          명
        </p>
        <p>
          지식공유자:
          {' '}
          {course.instructor}
        </p>
        <p>
          해시태그:
          {' '}
          {course.hashTags?.join(', ')}
        </p>
      </article>
    </div>
  );
}
