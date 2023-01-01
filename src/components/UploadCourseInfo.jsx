/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';

export default function UploadCourseInfo() {
  const navigate = useNavigate();

  // const { state } = useLocation();
  // const { courseId } = state;

  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const course = ['title', 'category'].reduce((acc, key) => ({
      ...acc,
      [key]: courseFormStore[key],
    }), {});

    if (course.title && course.category) {
      courseStore.update({ ...course, courseId });

      navigate(`/courses/${courseId}/edit/description`, {
        state: { courseId },
      });
    }
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
  }, []);

  // useEffect(() => {
  //   console.log(state);
  // }, []);

  useEffect(() => {
    courseFormStore.changeTitle(courseStore.savedCourse.title);
    courseFormStore.changeCategory(courseStore.savedCourse.category);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        강의정보
      </h2>
      <div>
        <label htmlFor="input-title">강의 제목</label>
        <input
          id="input-title"
          type="text"
          placeholder="제목을 입력하세요"
          value={courseFormStore.title}
          onChange={(e) => courseFormStore.changeTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-category">카테고리</label>
        {['개발 프로그래밍', '보안 네트워크', '데이터 사이언스', '게임 개발', '크리에이티브',
          '직무 마케팅', '학문 외국어', '커리어', '교양', '그 외']
          .map((category, i) => (
            <input
              key={i}
              id="input-category"
              type="button"
              value={category}
              onClick={(e) => courseFormStore.changeCategory(e.target.value)}
            />
          ))}
      </div>
      <button type="submit">저장 후 다음이동</button>
    </form>
  );
}
