import { useNavigate } from 'react-router-dom';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';
import useSectionStore from '../hooks/useSectionStore';

export default function CourseTitlePage() {
  const navigate = useNavigate();

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();
  const sectionStore = useSectionStore();
  const lectureStore = useLectureStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!courseFormStore.titleError) {
      const course = ['title'].reduce((acc, key) => ({
        ...acc,
        [key]: courseFormStore[key],
      }), {});

      await courseStore.save(course);
      const courseId = courseStore.savedCourse.id;

      await sectionStore.save({ courseId, title: '첫 번째 섹션의 제목을 입력해주세요.', goal: '' });
      const sectionId = sectionStore.sections[sectionStore.sections.length - 1].id;

      await lectureStore.save({ courseId, sectionId, title: '첫 번째 수업을 만들어주세요.' });

      courseFormStore.reset();

      navigate(`/courses/${courseId}/edit/course_info`, {
        state: { courseId },
      });
    }
  };

  return (
    <article>
      <h2>
        제목을 입력해주세요!
        <br />
        너무 고민하지마세요. 제목은 언제든 수정 가능해요 :)
      </h2>
      <form onSubmit={handleSubmit}>
        <label hidden htmlFor="input-title">제목</label>
        <input
          id="input-title"
          type="text"
          placeholder="제목을 입력해주세요."
          value={courseFormStore.title}
          onChange={(e) => courseFormStore.changeTitle(e.target.value)}
        />
        {courseFormStore.error && (
          <div>
            {courseFormStore.error.message}
          </div>
        )}
        <button type="submit">강의만들기</button>
      </form>
    </article>
  );
}
