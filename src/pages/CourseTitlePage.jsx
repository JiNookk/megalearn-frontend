import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SecondaryButton from '../components/ui/SecondaryButton';
import SubTitle from '../components/ui/SubTitle';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';
import useSectionStore from '../hooks/useSectionStore';

const Container = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 10rem;

    div{
      width: 450px;
    }
`;

const Form = styled.form`
  width: 100%;

  input{
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    background: #f6f6f6;
    border: none;
  }

  button{
    margin-top: 4rem;
    padding: 1rem 2rem;
  }
`;

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
      const courseId = courseStore.course.id;

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
    <Container>
      <div>
        <SubTitle>
          제목을 입력해주세요!
          <br />
          너무 고민하지마세요. 제목은 언제든 수정 가능해요 :)
        </SubTitle>
        <Form onSubmit={handleSubmit}>
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
          <SecondaryButton type="submit">
            강의만들기
          </SecondaryButton>
        </Form>
      </div>
    </Container>
  );
}
