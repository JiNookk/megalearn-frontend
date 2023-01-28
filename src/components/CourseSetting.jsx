import { useInterval } from 'usehooks-ts';
import styled from 'styled-components';
import { useEffect } from 'react';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import Title from './ui/Title';
import SubTitle from './ui/SubTitle';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.div`
  flex: 1;
  background: white;
  padding: 2.5rem 1.25rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;

  >p{
    margin-block: 1rem;
    color: #ABB0B5;
  }
`;

const Guide = styled.div`
  padding: 1rem;
  background: #F7F7F7;
  margin-block: 2.5rem;
  
  h3{
    margin-bottom: .5rem;
  }

  div{
    margin-block: 1.5rem;
  }

  p{
    margin-block: .5rem
  }
`;

const Form = styled.form`
  >div:first-child{
    width: 300px;
    display: flex;
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
  }

  input{
    width: 100%;
    border: none;
    text-align: right;
  }
`;

const ButtonWrapper = styled.div`
  margin-block: 4rem 2rem;
  text-align: center;

  button{
    padding: 1rem .5rem;

  }
`;

export default function CourseSetting() {
  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleChangePrice = (price) => {
    courseFormStore.changePrice(price);
  };

  useInterval(() => courseFormStore.validatePrice(), 1000);

  const handleSubmit = (event) => {
    const updated = ['price'].reduce((acc, key) => ({
      ...acc,
      [key]: courseFormStore[key],
    }), {});

    courseStore.update({ ...courseStore.course, courseId, ...updated });

    event.preventDefault();
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId })
      .then(() => {
        courseFormStore.changePrice(courseStore.course.price);
      });
  }, []);

  return (
    <Container>
      <p>
        설정
      </p>
      <Title>
        강의설정
      </Title>
      <Guide>
        <div>
          <SubTitle>
            강의 설정 - 가격 및 수강 기한
          </SubTitle>
          <p>
            설정해 주신 강의 가격은 부가세 미포함 가격입니다.
          </p>
          <p>
            가격은 무료의 경우 0원으로 유료의 경우 10,000원 이상 1,000원 단위로 설정할 수 있습니다.
          </p>
        </div>
      </Guide>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input-price">₩</label>
          <input
            id="input-price"
            type="number"
            placeholder="가격을 설정해주세요"
            value={courseFormStore.price}
            onChange={(e) => handleChangePrice(e.target.value)}
          />
        </div>
        <ButtonWrapper>
          <PrimaryButton type="submit">
            저장 후 다음 이동
          </PrimaryButton>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
