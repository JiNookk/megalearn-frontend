import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

const Banner = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5rem;
  padding: 1rem;

  background: #333b3d;
  color: white;
  
  button{
    padding: 1rem 3rem;
    margin-left: .4rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const Heading = styled.h2`
  font-weight: bold;
  font-size: 1.7rem;
`;

export default function CreateCourseBanner() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  const handleSave = () => {
    // navigate('/');
  };

  return (
    <Banner>
      <Heading>내 강의 만들기</Heading>
      <div>
        <PrimaryButton type="button" onClick={handleNavigate}>
          강의보기
        </PrimaryButton>
        <SecondaryButton type="button" onClick={handleSave}>
          저장
        </SecondaryButton>
      </div>
    </Banner>
  );
}
