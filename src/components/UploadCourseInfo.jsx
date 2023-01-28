/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCategoryStore from '../hooks/useCategoryStore';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import useSkillTagStore from '../hooks/useSkillTagStore';
import PrimaryButton from './ui/PrimaryButton';
import Title from './ui/Title';

const Form = styled.form`
  flex: 1;
  background: white;
  padding: 2.5rem 1.25rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;

  p:first-child{
    margin-block: 1rem;
    color: #ABB0B5;
  }
`;

const TextInputWrapper = styled.div`
  width: 50%;

  button{
    width: 100%;
    padding-block: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  color: #3E4042;
  margin-block: 2rem .5rem;
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  margin-block-end: .5rem;
  border:none;
  background: #F7F7F7;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SkillButton = styled.input`
  padding: 1rem .75rem;
  margin-inline-end: 1rem;
  margin-block: .5rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;
  background: ${(props) => (props.selected ? '#75E6C7' : '#FFFFFF')};
  color: ${(props) => (props.selected ? '#FFF' : '#000')};
`;

const CategoryButton = styled.input`
  padding: 1rem .75rem;
  margin-inline-end: 1rem;
  margin-block: .5rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;
  background: ${(props) => (props.value === props.selected ? '#75E6C7' : '#FFFFFF')};
  color: ${(props) => (props.value === props.selected ? '#FFF' : '#000')};
`;

const LevelButton = styled.input`
  padding: 1rem .5rem;
  margin-inline-end: 1rem;
  margin-block: .5rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;
  background: ${(props) => (props.value === props.selected ? '#75E6C7' : '#FFFFFF')};
  color: ${(props) => (props.value === props.selected ? '#FFF' : '#000')};
`;

const ButtonWrapper = styled.div`
  margin-block: 2rem;
  text-align: center;

  button{
    padding: 1rem .5rem;
  }
`;

export default function UploadCourseInfo() {
  const navigate = useNavigate();
  const courseId = window.location.pathname.split('/')[2];

  const categoryStore = useCategoryStore();
  const skillTagStore = useSkillTagStore();
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

  const handleAddSkill = (e) => {
    courseFormStore.changeSkill(e.target.value);

    const { skills } = courseFormStore;

    courseStore.update({ ...courseStore.course, skills: [...skills], courseId });
  };

  useEffect(() => {
    categoryStore.fetchCategories();
    skillTagStore.fetchSkillTags();
    courseStore.fetchCourse({ courseId })
      .then(() => {
        courseFormStore.changeTitle(courseStore.course.title);
        courseFormStore.changeCategory(courseStore.course.category);
        courseFormStore.changeLevel(courseStore.course.level);
        courseFormStore.setSkill(courseStore.course.skillSets);
      });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        강의제작
      </p>
      <Title>
        강의정보
      </Title>
      <TextInputWrapper>
        <Label htmlFor="input-title">강의 제목</Label>
        <Input
          id="input-title"
          type="text"
          placeholder="제목을 입력하세요"
          value={courseFormStore.title}
          onChange={(e) => courseFormStore.changeTitle(e.target.value)}
        />
      </TextInputWrapper>
      <TextInputWrapper>
        <Label htmlFor="input-skills">이런 걸 배울 수 있어요</Label>
        {skillTagStore.skillTags
          .map((skill) => (
            <SkillButton
              key={skill.id}
              id="input-skill"
              type="button"
              value={skill.content}
              selected={courseFormStore.skills.has(skill.content)}
              onClick={handleAddSkill}
            />
          ))}
      </TextInputWrapper>
      <div>
        <Label htmlFor="input-category">카테고리</Label>
        <Categories>
          {categoryStore.categories
            .map((category) => (
              <CategoryButton
                key={category.id}
                id="input-category"
                type="button"
                value={category.content}
                selected={courseFormStore.category}
                onClick={(e) => courseFormStore.changeCategory(e.target.value)}
              />
            ))}
        </Categories>
      </div>
      <div>
        <Label htmlFor="input-level">강의 수준</Label>
        {['입문', '초급', '중급이상']
          .map((level, i) => (
            <LevelButton
              key={i}
              id="input-level"
              type="button"
              value={level}
              selected={courseFormStore.level}
              onClick={(e) => courseFormStore.changeLevel(e.target.value)}
            />
          ))}
      </div>
      <ButtonWrapper>
        <PrimaryButton type="submit">저장 후 다음이동</PrimaryButton>
      </ButtonWrapper>
    </Form>
  );
}
