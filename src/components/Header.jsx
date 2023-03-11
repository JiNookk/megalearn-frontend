import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import Padding from './ui/Padding';
import { apiService } from '../services/ApiService';

const Navigation = styled.nav`
  >div:first-child{
    padding-block: .8rem;
    text-align: end;
  }
  >div:last-child{
    border-block: 1px solid #D9D9D9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  `;

const List = styled.ul`
  display: flex;
  padding-inline: 0;
  padding-block: 1rem;
  
  li{
    display: flex;
    align-items: center;
  }

  h3>a{
  margin-inline-end: 2rem;
  }
`;

const SearchBar = styled.form`
  background: #efefef;
  padding: .7rem;
  margin-inline-end: 2rem;
  border-radius: .25rem;

  input{
    background: #efefef;
    border: none;
  }

  button{
    background: none;
    border: none;
  }
`;

const Login = styled(Link)`
  padding: 1rem;
  margin-inline-end: 1rem;
  border: 1px solid #D9D9D9;
  border-radius: .25rem;
`;

const Logout = styled.button`
  padding: 1rem;
  border: 1px solid #D9D9D9;
  border-radius: .25rem;
  background: none;
`;

const Register = styled(Link)`
  padding: 1rem;
  border: 1px solid #D9D9D9;
  border-radius: .25rem;
  color: white;
  background: #EE806D;
`;

const Icon = styled.li`
  margin-inline-end: 1rem;
`;

export default function Header() {
  const [isLecture, setIsLecture] = useState(false);

  const { location } = window;

  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    apiService.accessToken(accessToken);

    navigate('/');
  };

  const handleSearchCourse = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsLecture(location.pathname.split('/')
      .filter((path) => path === 'lectures')[0] === 'lectures');
  }, [location.pathname]);

  return (
    <div>
      {!isLecture ? (
        <Navigation>
          <Padding>
            {accessToken && (
              <Link to="/instructor">
                지식공유자
              </Link>
            )}
          </Padding>
          <Padding>
            <List>
              <li>
                <h3>
                  <Link to="/">
                    <img src="/assets/images/megalearn.png" alt="home-link" />
                  </Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/courses">
                    강의
                  </Link>
                </h3>
              </li>
              {/* <li>
                <h3>
                  <Link to="/community">
                    커뮤니티
                  </Link>
                </h3>
              </li> */}
            </List>
            {accessToken ? (
              <List>
                <li>
                  <SearchBar onSubmit={handleSearchCourse}>
                    <label hidden htmlFor="input-content">내용 검색</label>
                    <input id="input-content" type="text" />
                    <button type="submit">
                      <img src="/assets/images/search.png" alt="search" />
                    </button>
                    {/* <Link to={'/courses?content='}>
                </Link> */}
                  </SearchBar>
                </li>
                <Icon>
                  <Link to="/carts">
                    <img src="/assets/images/cart.png" alt="cart" />
                  </Link>
                </Icon>
                <Icon>
                  <Link to="/account/dashboard">
                    <img id="dashboard" src="/assets/images/profile.png" alt="profile" />
                  </Link>
                </Icon>
                <li>
                  <Logout type="button" onClick={handleLogout}>
                    로그아웃
                  </Logout>
                </li>
              </List>
            ) : (
              <List>
                <li>
                  <SearchBar onSubmit={handleSearchCourse}>
                    <label hidden htmlFor="input-content">내용 검색</label>
                    <input id="input-content" type="text" />
                    <button type="submit">
                      <img src="/assets/images/search.png" alt="search" />
                    </button>
                    {/* <Link to={'/courses?content='}>
                </Link> */}
                  </SearchBar>
                </li>
                <li>
                  <Login to="/login">
                    로그인
                  </Login>
                </li>
                <li>
                  <Register to="/register">
                    회원가입
                  </Register>
                </li>
              </List>
            )}
          </Padding>
        </Navigation>
      ) : null}
    </div>
  );
}
