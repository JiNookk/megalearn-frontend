/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import { dateFormat } from '../utils/DateFormat';

const List = styled.ul`
  li{
    display: flex;
    padding: 2rem;
    margin: 1rem;
    border: 1px solid #e8e8e9;
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin-inline-end: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold; 
  margin-block-end: .4rem;
  `;

const Author = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-block-end: .4rem;
`;

const CreatedAt = styled.p`
  padding-inline: .5rem;
`;

export default function CourseNews() {
  const courseStore = useCourseStore();

  return (
    <article>
      <List>
        {courseStore.course.news.length ? (
          courseStore.course.news
            .map((post, i) => (
              <li key={i}>
                <div>
                  <Image src="/assets/images/test.jpg" alt="" />
                </div>
                <div>
                  <Title>
                    {post.title}
                  </Title>
                  <Author>
                    {courseStore.course.instructor}
                  </Author>
                  <CreatedAt>
                    {dateFormat.fromNow(post.createdAt)}
                  </CreatedAt>
                  <p>
                    {post.content}
                  </p>
                  {/* <p>
                    이 소식이 도움이 되었나요?
                  </p> */}
                </div>
              </li>
            ))
        ) : (
          <p>
            아직 내용이 없습니다.
          </p>
        )}
      </List>
    </article>
  );
}
