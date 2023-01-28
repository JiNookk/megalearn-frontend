/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubTitle from '../components/ui/SubTitle';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import getQueryParam from '../utils/getQueryParam';
import Courses from '../components/Courses';
import Padding from '../components/ui/Padding';
import CourseFilters from '../components/CourseFilters';
import useCategoryStore from '../hooks/useCategoryStore';
import useSkillTagStore from '../hooks/useSkillTagStore';

const Container = styled.div`
  display: flex;
  padding-block: 2rem;
  `;

const Main = styled.div`
  width: 100%;
  padding-inline: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div{
    display: flex;
  }
`;

const Form = styled.form`
    display: flex;
    margin-inline-end: 1rem;
    padding-inline-start: .5rem;
    border: 1px solid #D3DADD;
    border-radius: .5rem;
    height: 2.5rem;
    
    input{
      border-radius: .5rem;
      border: none;
    }

    button{
      border: none;
      border-inline-start: 1px solid #D3DADD;
    }
`;

const Category = styled.ul`
  width: 210px;

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

export default function CoursesPage() {
  const [filter, setFilter] = useState({});

  const page = getQueryParam({ category: 'page' });

  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();
  const categoryStore = useCategoryStore();
  const skillTagStore = useSkillTagStore();

  // const category = {
  //   '전체 강의': '',
  //   '개발 • 프로그래밍': '/it-programming',
  //   '보안 • 네트워크': '/it',
  //   '데이터 사이언스': '/data-science',
  //   '게임 개발': '/game-dev',
  //   크리에이티브: '/creative',
  //   '직무 • 마케팅': '/business',
  //   커리어: '/career',
  //   교양: '/life',
  // };

  const handleSearchContent = (event) => {
    event.preventDefault();

    const content = event.target.content.value;

    setFilter({ ...filter, content });
  };

  useEffect(() => {
    courseStore.fetchCourses({ page, filter });
    ratingStore.fetchRatings();
  }, [page, filter]);

  useEffect(() => {
    categoryStore.fetchCategories();
    skillTagStore.fetchSkillTags();
  }, []);

  return (
    <Padding>
      <Container>
        <Category>
          {categoryStore.categories
            .map((category) => (
              <li key={category.id}>
                <Link to={`/courses${category.url ? `/${category.url}` : ''}`}>
                  <p>
                    {category.content}
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
            <Form onSubmit={handleSearchContent}>
              <label hidden htmlFor="input-content">강의 검색</label>
              <input name="content" placeholder="전체 강의 검색" id="input-content" type="text" />
              <button type="submit">검색</button>
            </Form>
          </SearchBar>
          <CourseFilters filter={filter} setFilter={setFilter} />
          <Courses />
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
            {page && page < courseStore.totalPages ? (
              <Link to="/courses?page=">
                다음 페이지
              </Link>
            ) : (
              <div />
            )}
          </PageLinks>
        </Main>
      </Container>
    </Padding>
  );
}
