import styled from 'styled-components';
import useAccountStore from '../../hooks/useAccountStore';
import useRegisterFormStore from '../../hooks/useRegisterFormStore';
import SecondaryButton from '../ui/SecondaryButton';

const Form = styled.form`
  width: 320px;

  input{
    width: 100%;
    margin-block-end: 1rem;
    padding: 1rem .5rem;
  }

  button{
    width: 100%;
    padding-block: 1.5rem;
    margin-block: 2rem;
  }
`;

export default function RegisterForm({ navigate }) {
  const accountStore = useAccountStore();
  const registerFormStore = useRegisterFormStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (registerFormStore.error.password) {
      return;
    }

    if (!registerFormStore.name || !registerFormStore.userName
      || !registerFormStore.phoneNumber || !registerFormStore.password
      || !registerFormStore.passwordCheck) {
      return;
    }

    const {
      name, userName, phoneNumber, password, passwordCheck,
    } = registerFormStore;

    const information = {
      name, userName, phoneNumber, password, passwordCheck,
    };

    try {
      await accountStore.register(information);

      registerFormStore.reset();
      navigate('/');
    } catch (e) {
      registerFormStore.setUserNameError();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label hidden htmlFor="input-name">이름</label>
        <input
          id="input-name"
          type="text"
          placeholder="이름"
          value={registerFormStore.name}
          onChange={(e) => registerFormStore.changeName(e.target.value)}
        />
      </div>
      <div>
        <label hidden htmlFor="input-userName">이메일</label>
        <input
          id="input-userName"
          type="text"
          placeholder="이메일"
          value={registerFormStore.userName}
          onChange={(e) => registerFormStore.changeUserName(e.target.value)}
        />
      </div>
      {registerFormStore.error.userName && (
        <div>
          {registerFormStore.error.userName}
        </div>
      )}
      <div>
        <label hidden htmlFor="input-phoneNumber">전화번호</label>
        <input
          id="input-phoneNumber"
          type="text"
          placeholder="전화번호"
          value={registerFormStore.phoneNumber}
          onChange={(e) => registerFormStore.changePhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label hidden htmlFor="input-password">비밀번호</label>
        <input
          id="input-password"
          type="password"
          placeholder="비밀번호"
          value={registerFormStore.password}
          onChange={(e) => registerFormStore.changePassword(e.target.value)}
        />
      </div>
      {registerFormStore.error.password && (
        <div>
          {registerFormStore.error.password}
        </div>
      )}
      <div>
        <label hidden htmlFor="input-passwordCheck">비밀번호 확인</label>
        <input
          id="input-passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          value={registerFormStore.passwordCheck}
          onChange={(e) => registerFormStore.changePasswordCheck(e.target.value)}
        />
      </div>
      <SecondaryButton id="register-button" type="submit">
        회원가입
      </SecondaryButton>
    </Form>
  );
}
