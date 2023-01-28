import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import RegisterForm from '../components/forms/RegisterForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* padding-top: 200px; */
`;

const Image = styled.img`
    width: 120px;
    height: 25px;
    margin-bottom: 3rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  margin-block-end: 2rem;

  img{
    display: block;
    height: 1px;
  }

  p{
    margin-inline: 1rem;
    color: #A0A0A0;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-around;

  button{
    border: none;
    background: none;
    cursor: pointer;
  }
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
