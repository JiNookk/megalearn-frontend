import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterForm from '../components/forms/RegisterForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 4rem;
`;

const Image = styled.img`
    width: 120px;
    height: 25px;
    margin-bottom: 3rem;
`;

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Image src="/assets/images/megalearn.png" alt="" />
      <RegisterForm navigate={navigate} />
    </Container>
  );
}
