/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import styled from 'styled-components';
import useRatingStore from '../hooks/useRatingStore';
import { dateFormat } from '../utils/DateFormat';

const Title = styled.div`
  display: flex;

  p{
    margin-inline: 1rem;
    color: #adb5bd;
  }
`;

const Statistics = styled.div`
  display: flex;
  text-align: center;
  width: 100%;

  margin-block-start: 2rem;
  margin-block-end: 4rem;

  div{
    padding: 3rem;
    border: 1px solid #e8ecef;
    width: 100%;
  }

  div:first-child{
    width: 40%;
    margin-right: .5rem;
  }
`;

const Filter = styled.ul`
  display: flex;
  list-style: disc;
  
  li:first-child{
    list-style: none;
    color: black;
  }

  li{
    margin-inline: 1.5rem;
    color : #b0b9bf;
  }
`;

const Review = styled.li`
  border-bottom: 1px solid #e8ecef;
  padding-block: 2rem;

  > div{
    display: flex;
    margin-block: 1rem;
  }
`;

const Image = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;

  margin-inline-end: 2rem;
`;

export default function Reviews() {
  const courseId = window.location.pathname.split('/')[2];

  const ratingStore = useRatingStore();

  useEffect(() => {
    ratingStore.fetchRatings();
  }, []);

  return (
    <div id="reviews">
      <Title>
        <h2>
          수강평
        </h2>
        <p>
          총
          {' '}
          {ratingStore.ratings
            .filter((rating) => rating.courseId === +courseId)
            .length}
          개
        </p>
      </Title>
      <Statistics>
        <div>
          <p>
            {(ratingStore.ratings
              .filter((rating) => rating.courseId === +courseId)
              .reduce((acc, cur) => acc + cur.rating, 0)
          / ratingStore.ratings
            .filter((rating) => rating.courseId === +courseId)
            .length).toFixed(1)}
          </p>
          <p>
            {ratingStore.ratings
              .filter((rating) => rating.courseId === +courseId)
              .length}
            개의 수강평
          </p>
        </div>
        <div>
          <ul>
            {[5, 4, 3, 2, 1]
              .map((number, i) => (
                <li key={i}>
                  {number}
                  점 :
                  {' '}
                  {ratingStore.ratings
                    .filter((rating) => rating.courseId === +courseId)
                    .filter((rating) => rating.rating === number)
                    .length}
                </li>
              ))}
          </ul>
        </div>
      </Statistics>
      <Filter>
        <li>
          VIEW
        </li>
        <li>
          좋아요 순
        </li>
        <li>
          최신 순
        </li>
        <li>
          높은 평점 순
        </li>
        <li>
          낮은 평점 순
        </li>
      </Filter>
      <ul>
        {ratingStore.ratings
          .filter((rating) => rating.courseId === +courseId)
          .map((rating) => (
            <Review key={rating.id}>
              <div>
                <Image src="/assets/images/test.jpg" alt="" />
                <div>
                  <p>{rating.rating}</p>
                  <p>{rating.author}</p>
                </div>
              </div>
              <div>
                {rating.content}
              </div>
              <div>
                {dateFormat.defaultFormat(rating.createdAt)}
              </div>
            </Review>
          ))}
      </ul>
    </div>
  );
}
