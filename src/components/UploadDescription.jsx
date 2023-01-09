/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';

export default function UploadDescription() {
  const navigate = useNavigate();

  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const course = ['description'].reduce((acc, key) => ({
      ...acc,
      [key]: courseFormStore[key],
    }), {});

    if (course.description) {
      courseStore.update({ ...courseStore.course, ...course, courseId });

      navigate(`/courses/${courseId}/edit/curriculum`, {
        state: { courseId },
      });
    }
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
  }, []);

  useEffect(() => {
    courseFormStore.changeDescription(courseStore.course.description);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        상세소개
      </h2>
      <div>
        <label htmlFor="input-description">강의 상세 내용</label>
        <input
          id="input-description"
          type="text"
          placeholder="🙆‍♀️ 소개글은 강의의 인상을 좌우합니다 🙆‍♂️"
          value={courseFormStore.description}
          onChange={(e) => courseFormStore.changeDescription(e.target.value)}
        />
      </div>
      <button type="submit">저장 후 다음이동</button>
    </form>
  );
}
