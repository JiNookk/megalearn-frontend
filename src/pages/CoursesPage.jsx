/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubTitle from '../components/ui/\bSubTitle';
import Button from '../components/ui/Button';
import PrimaryButton from '../components/ui/PrimaryButton';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import getQueryParam from '../utils/getQueryParam';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  `;

const Main = styled.div`
  width: 100%;
  padding-inline: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  >div{
    display: flex;
  }
`;

const Category = styled.ul`
  width: 15%;

  li{
    padding: 1rem;
    border: 1px solid #e4e4e4;
    background: #fafafa;
  }
  a{
    display: flex;
    justify-content: space-between;
  }
`;

const Tags = styled.ul`
  display: flex;
  align-items: center;

  li{
    margin-inline-end: 1rem;
  }
`;

const Skills = styled.div`
  display: flex;

  > div {
    display: flex;
    margin-inline-end: 1rem;
  }

  ul{
    flex-wrap: wrap;
  }
`;

const Filters = styled.div`
  display: flex;

  margin-block: .5rem 3rem;
`;

const CostFilter = styled(Button)`
  border: none;
  padding: .5rem 1rem;
  border-radius: 2rem;
  background: #e4e4e4;
  `;

const LevelFilter = styled(PrimaryButton)`
  padding: .5rem 1rem;
  border-radius: 2rem;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
`;

const PageLinks = styled.div`
  display: flex;
  justify-content: space-between;

  margin-block-start: 4rem;

  a{
    display: block;
    padding: .4rem;
    border: 1px solid #d5dbe2;
    border-radius: 4px;
  }
`;

const Pages = styled.ul`
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height: 60px;
`;

const RefreshButton = styled.button`
  display: block;
  background: none;
  border: 1px solid #d5dbe2;
  border-radius: 50%;
`;

export default function CoursesPage() {
  const [filter, setFilter] = useState({});

  const path = window.location.pathname.split('/')[2];
  const page = getQueryParam({ category: 'page' });

  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();

  const category = {
    '전체 강의': '',
    '개발 • 프로그래밍': '/it-programming',
    '보안 • 네트워크': '/it',
    '데이터 사이언스': '/data-science',
    '게임 개발': '/game-dev',
    크리에이티브: '/creative',
    '직무 • 마케팅': '/business',
    커리어: '/career',
    교양: '/life',
  };

  const getKey = (url) => Object.keys(category)
    .find((key) => category[key].substring(1) === url);

  const handleFilterSkill = (skill) => {
    setFilter({ ...filter, skill });
  };

  const handleSearchContent = (event) => {
    event.preventDefault();

    const content = event.target.content.value;

    setFilter({ ...filter, content });
  };

  const handleSearchSkill = (event) => {
    event.preventDefault();

    const skill = event.target.skill.value;

    handleFilterSkill(skill);
  };

  const handleFilterCost = (cost) => {
    setFilter({ ...filter, cost });
  };

  const handleFilterLevel = (level) => {
    setFilter({ ...filter, level });
  };

  const handleRefreshFilter = () => {
    setFilter({});
  };
  useEffect(() => {
    console.log(getKey(path));
    console.log(path);
  }, [path]);

  useEffect(() => {
    courseStore.fetchCourses({ page, filter });
    ratingStore.fetchRatings();
  }, [page, filter]);

  return (
    <Container>
      <Category>
        {Object.keys(category)
          .map((item, i) => (
            <li key={i}>
              <Link to={`/courses${category[item]}`}>
                <p>
                  {item}
                </p>
                <p>
                  {'>'}
                </p>
              </Link>
            </li>
          ))}
      </Category>
      <Main>
        <SearchBar>
          <SubTitle>
            전체 강의
          </SubTitle>
          <form onSubmit={handleSearchContent}>
            <label hidden htmlFor="input-content">강의 검색</label>
            <input name="content" placeholder="전체 강의 검색" id="input-content" type="text" />
            <button type="submit">검색</button>
          </form>
        </SearchBar>
        <Skills>
          <form onSubmit={handleSearchSkill}>
            <label hidden htmlFor="search-skill">기술 검색</label>
            <input placeholder="기술 검색" name="skill" id="search-skill" type="text" />
            <button type="submit">검색</button>
          </form>
          <Tags>
            {['HTML/CSS', 'JavaScript', 'Java', '객체지향', 'React', 'Spring',
              'Python', 'Node.js', '머신러닝']
              .map((skill, i) => (
                <li key={i}>
                  <PrimaryButton type="button" onClick={() => handleFilterSkill(skill)}>
                    {skill}
                  </PrimaryButton>
                </li>
              ))}
          </Tags>
        </Skills>
        <Filters>
          <Tags>
            {['전체', '무료', '유료']
              .map((cost, i) => (
                <li key={i}>
                  <CostFilter type="button" onClick={() => handleFilterCost(cost)}>
                    {cost}
                  </CostFilter>
                </li>
              ))}
          </Tags>
          <Tags>
            {['입문', '초급', '중급이상']
              .map((level, i) => (
                <li key={i}>
                  <LevelFilter type="button" onClick={() => handleFilterLevel(level)}>
                    {level}
                  </LevelFilter>
                </li>
              ))}
          </Tags>
          <RefreshButton type="button" onClick={handleRefreshFilter}>
            ♻️
          </RefreshButton>
        </Filters>
        <List>
          {courseStore.courses.length
            ? courseStore.courses
              .filter((course) => course.category === (getKey(path) || course.category))
              .map((course) => (
                <li key={course.id} className="item">
                  <Link to={`/courses/${course.id}`}>
                    <Image src="/assets/images/test.jpg" alt="course-items" />
                    <h3>{course.title}</h3>
                    <p>{course.instructor}</p>
                    <p>
                      {(ratingStore.ratings
                        .filter((rating) => rating.courseId === course.id)
                        .reduce((acc, cur) => acc + cur.rating, 0)
                / ratingStore.ratings
                  .filter((rating) => rating.courseId === course.id)
                  .length || 0)
                        .toFixed(2) }
                    </p>
                    <p>
                      ₩
                      {numberFormat(course.price)}
                    </p>
                  </Link>
                </li>
              ))
            : (
              <li>
                <p>
                  <strong>
                    🙈 검색 결과가 없어요! 🙊
                  </strong>
                </p>
                <p>
                  필터를 다시 적용해보시거나 카테고리를 이동해보세요
                </p>
              </li>
            )}
        </List>
        <PageLinks>
          {page > 1 ? (
            <Link to="/courses?page=">
              이전 페이지
            </Link>
          ) : (
            <div />
          )}
          <Pages>
            {[...Array(courseStore.totalPages)]
              .map((_, i) => (
                <li key={i} className="page">
                  <Link to={`/courses?page=${i + 1}`}>
                    {i + 1}
                  </Link>
                </li>
              ))}
          </Pages>
          {page < courseStore.totalPages ? (
            <Link to="/courses?page=">
              다음 페이지
            </Link>
          ) : (
            <div />
          )}
        </PageLinks>
      </Main>
    </Container>
  );
}
