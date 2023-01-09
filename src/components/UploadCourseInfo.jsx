/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import SecondaryButton from './ui/SecondaryButton';

export default function UploadCourseInfo() {
  const navigate = useNavigate();
  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const course = ['title', 'category', 'level'].reduce((acc, key) => ({
      ...acc,
      [key]: courseFormStore[key],
    }), {});

    if (course.title && course.category && course.level) {
      courseStore.update({ ...courseStore.course, ...course, courseId });

      navigate(`/courses/${courseId}/edit/description`, {
        state: { courseId },
      });
    }
  };

  const handleAddSkill = () => {
    const { skill } = courseFormStore;
    courseStore.update({ ...courseStore.course, skill, courseId });

    courseFormStore.changeSkill('');
  };

  const handleDeleteSkill = (skill) => {
    courseStore.deleteSkill({ courseId, skill });
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
  }, []);

  useEffect(() => {
    courseFormStore.changeTitle(courseStore.course.title);
    courseFormStore.changeCategory(courseStore.course.category);
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
        <label htmlFor="input-skills">이런 걸 배울 수 있어요</label>
        <input
          id="input-skills"
          type="text"
          placeholder="ex) 리액트 네이티브 개발"
          value={courseFormStore.skill}
          onChange={(e) => courseFormStore.changeSkill(e.target.value)}
        />
        <SecondaryButton type="button" onClick={handleAddSkill}>
          추가하기
        </SecondaryButton>
      </div>
      <ul>
        {courseStore.course.skillSets
          ?.map((skill, i) => (
            <li key={i}>
              <p>
                {skill}
              </p>
              <button type="button" onClick={() => handleDeleteSkill(skill)}>
                🗑
              </button>
            </li>
          ))}
      </ul>
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
      <div>
        <label htmlFor="input-level">강의 수준</label>
        {['입문', '초급', '중급이상']
          .map((level, i) => (
            <input
              key={i}
              id="input-level"
              type="button"
              value={level}
              onClick={(e) => courseFormStore.changeLevel(e.target.value)}
            />
          ))}
      </div>
      <button type="submit">저장 후 다음이동</button>
    </form>
  );
}
