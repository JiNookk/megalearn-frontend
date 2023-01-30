/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import Padding from '../components/ui/Padding';
import SecondaryButton from '../components/ui/SecondaryButton';
import SubTitle from '../components/ui/SubTitle';

const Container = styled.div`
  display  : flex;
  padding-block: 2rem;
`;

const TopWriterWrapper = styled.div`
  padding: 1rem;
  border: 1px solid #DADADA;
  border-radius: .5rem;
  margin-block: 1rem;
`;

const TopWriter = styled.ul`
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: .5rem;

    p:first-child{
      display: flex;
      align-items: center;
    }
  }
`;

const WeeklyBestPostsWrapper = styled.div`
  padding: 1rem;
  border: 1px solid #DADADA;
  border-radius: .5rem;
`;

const WeeklyBestPosts = styled.ul`
    li{
    margin-block: 1rem;

    p:last-child{
      display: flex;
      align-items: center;
      margin-top: .5rem;
    }
  }
`;

const Main = styled.div`
  flex: 1;
`;

const Image = styled.img`
  margin-inline-end: .5rem;    
`;

const Inquiries = styled.ul`
  
`;

export default function CommunityPage() {
  const handleSubmit = () => {
    //
  };

  return (
    <Padding>
      <Container>
        <div>
          <TopWriterWrapper>
            <SubTitle>
              메가런 TOP Writers
            </SubTitle>
            <TopWriter>
              <li>
                <p>
                  <Image src="/assets/images/default-profile.png" alt="" />
                  OMG
                </p>
                <p>
                  209
                </p>
              </li>
              <li>
                <p>
                  <Image src="/assets/images/default-profile.png" alt="" />
                  David
                </p>
                <p>
                  70
                </p>
              </li>
              <li>
                <p>
                  <Image src="/assets/images/default-profile.png" alt="" />
                  성문
                </p>
                <p>
                  15
                </p>
              </li>
            </TopWriter>
          </TopWriterWrapper>
          <WeeklyBestPostsWrapper>
            <SubTitle>
              주간 인기글
            </SubTitle>
            <WeeklyBestPosts>
              <li>
                <p>
                  [데브경수] AI코딩
                </p>
                <p>
                  <Image src="/assets/images/default-profile.png" alt="" />
                  <strong>
                    데브경수
                  </strong>
                </p>
              </li>
              <li>
                <p>
                  선생님 혹시 술드시고 하신건가요??
                </p>
                <p>
                  <Image src="/assets/images/default-profile.png" alt="" />
                  <strong>
                    govi2689
                  </strong>
                </p>
              </li>
            </WeeklyBestPosts>
          </WeeklyBestPostsWrapper>
        </div>
        <Main>
          <ul>
            <li>
              전체
            </li>
            <li>
              해결
            </li>
            <li>
              미해결
            </li>
          </ul>
          <form onSubmit={handleSubmit}>
            <label hidden htmlFor="input-content">내용</label>
            <input
              id="input-content"
              placeholder="궁금한 질문을 검색해보세요!"
              type="text"
            />
            <SecondaryButton type="submit">
              검색
            </SecondaryButton>
          </form>
          <Inquiries>
            <li>
              <h3>
                option - configure idle이 없습니다.
              </h3>
              <p>
                새로 실행할 때마다 나오는 문구를 없애고 싶은데  강의대로 option을 눌러도 안됩니다.
              </p>
              <p>
                영직 • 4분 전 • 파이썬 문제풀이 알고리즘 입문 (코딩테스트 대비)
              </p>
            </li>
            <li>
              <h3>
                option - configure idle이 없습니다.
              </h3>
              <p>
                새로 실행할 때마다 나오는 문구를 없애고 싶은데  강의대로 option을 눌러도 안됩니다.
              </p>
              <p>
                영직 • 4분 전 • 파이썬 문제풀이 알고리즘 입문 (코딩테스트 대비)
              </p>
            </li>
            <li>
              <h3>
                option - configure idle이 없습니다.
              </h3>
              <p>
                새로 실행할 때마다 나오는 문구를 없애고 싶은데  강의대로 option을 눌러도 안됩니다.
              </p>
              <p>
                영직 • 4분 전 • 파이썬 문제풀이 알고리즘 입문 (코딩테스트 대비)
              </p>
            </li>
          </Inquiries>
        </Main>
      </Container>
    </Padding>
  );
}
