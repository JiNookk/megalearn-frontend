import { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import Container from '../components/ui/Container';
import Padding from '../components/ui/Padding';
import useAccountStore from '../hooks/useAccountStore';
import useCourseStore from '../hooks/useCourseStore';
import useRatingStore from '../hooks/useRatingStore';
import averageFormat from '../utils/averageFormat';
import getQueryParam from '../utils/getQueryParam';
import numberFormat from '../utils/numberFormat';

const HomeBanner = styled.div`
    background: #48A0F8 url('/assets/images/rocket.png') no-repeat right 10rem bottom -2rem;
    padding-block: 2rem;
`;

const Subtitle = styled.p`
  display: inline-block;
  font-weight: bold;
  padding: .6rem;
  border-radius: .4rem;
  background: #FAE351;
`;

const Bold = styled.p`
  font-size: 2rem;
  color: #FFFFFF;
  margin-block:2rem;
`;

const Small = styled.p`
  color: #FFFFFF;
`;

const SearchBar = styled.div`
  padding-inline: 300px;
  margin-block: 60px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  background: #C8E8D3;
  padding: .7rem;
  margin-inline-end: 2rem;
  border-radius: .5rem;
  text-align: end;
  
  input{
    text-align: start;
    width: 80%;
    background: #C8E8D3;
    border: none;
  }

  button{
    background: none;
    border: none;
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-block-end: 1rem;
`;

const Courses = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 5rem;

  li{
    display: flex;
    flex-direction: column;

    h3{
      font-size: 1.3rem;
      margin-block: 1rem;
    }

    p{
      margin-block: .2rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: .5rem;
`;

export default function HomePage() {
  const authCode = getQueryParam({ category: 'code' });

  const [, setAccessToken] = useLocalStorage('accessToken');
  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();
  const accountStore = useAccountStore();

  const handleSearchCourse = () => {

  };

  async function requestToken() {
    const accessToken = await accountStore.requestToken({ authCode });

    setAccessToken(accessToken);
  }

  useEffect(() => {
    if (authCode) {
      requestToken();
    }

    courseStore.fetchCourses();
    ratingStore.fetchRatings();

    console.log('hi');
    console.log(`js-key: ${process.env.REACT_APP_KAKAO_JS_KEY}`);
    console.log(`redirect-url: ${process.env.REACT_APP_KAKAO_REDIRECT_URL}`);
  }, []);

  return (
    <Container>
      <HomeBanner>
        <Padding>
          <Subtitle>
            <strong>
              극한의 도전을 즐겨라
            </strong>
          </Subtitle>
          <Bold>
            <strong>
              처음부터 제대로!
              <br />
              현업에 가장 가까운 교육 🔥
            </strong>
          </Bold>
          <div>
            <Small>
              검증된 교육 커리큘럼과 학습법으로
            </Small>
            <Small>
              오늘부터 나도 진짜 개발자
            </Small>
          </div>
        </Padding>
      </HomeBanner>
      <SearchBar>
        <Padding>
          <Form onSubmit={handleSearchCourse}>
            <label hidden htmlFor="input-content">검색</label>
            <input
              id="input-content"
              placeholder="배우고 싶은 지식을 입력해보세요"
              type="text"
            />
            <button type="submit">
              <img src="/assets/images/search.png" alt="search" />
            </button>
          </Form>
        </Padding>
      </SearchBar>
      <Padding>
        <Title>
          무료강의 목록
        </Title>
        <Courses>
          {courseStore.courses
            .filter((course) => course.status === 'approved')
            .filter((course) => course.price === 0)
            .filter((_, i) => i < 3)
            .map((course) => (
              <li key={course.id}>
                <Link to={`/courses/${course.id}`}>
                  <Image src={course.coverImage || '/assets/images/test.jpg'} alt="course" />
                  <h3>
                    {course.title}
                  </h3>
                  <p>
                    {course.instructor}
                  </p>
                  <Rating>
                    <ReactStars
                      edit={false}
                      value={averageFormat(ratingStore.ratings
                        .filter((rating) => rating.courseId === course.id))}
                    />
                    (
                    {ratingStore.ratings
                      .filter((rating) => rating.courseId === course.id)
                      .length}
                    )
                  </Rating>
                  <p>
                    무료
                  </p>
                </Link>
              </li>
            ))}
        </Courses>
      </Padding>
      <Padding>
        <Title>
          초보용 강의 목록
        </Title>
        <Courses>
          {courseStore.courses
            .filter((course) => course.status === 'approved')
            .filter((course) => course.level !== '중급이상')
            .filter((_, i) => i < 3)
            .map((course) => (
              <li key={course.id}>
                <Link to={`/courses/${course.id}`}>
                  <Image src={course.coverImage || '/assets/images/test.jpg'} alt="course" />
                  <h3>
                    {course.title}
                  </h3>
                  <p>
                    {course.instructor}
                  </p>
                  <Rating>
                    <ReactStars
                      edit={false}
                      value={averageFormat(ratingStore.ratings
                        .filter((rating) => rating.courseId === course.id))}
                    />
                    (
                    {ratingStore.ratings
                      .filter((rating) => rating.courseId === course.id)
                      .length}
                    )
                  </Rating>
                  <p>
                    {numberFormat(course.price)}
                    원
                  </p>
                </Link>
              </li>
            ))}
        </Courses>
      </Padding>
    </Container>
  );
}
