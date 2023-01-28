/* eslint-disable react/no-array-index-key */
import { Line } from 'rc-progress';
import { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import usePaymentStore from '../hooks/usePaymentStore';
import useRatingFormStore from '../hooks/useRatingFormStore';
import useRatingStore from '../hooks/useRatingStore';
import { dateFormat } from '../utils/DateFormat';
import percentageFormat from '../utils/percentageFormat';
import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';

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

  > div{
    border: 1px solid #e8ecef;
    width: 100%;
  }
  
  > div:first-child{
    padding: 3rem;
    width: 40%;
    margin-right: .5rem;
    
    p:first-child{
      font-size: 2.25rem;
    }

    > div:nth-child(2){
      margin-block: 1rem;
      display: flex;
      justify-content: center;
    }

    p:last-child{
      color: #ABB0B5;
    }
  }

`;

const RatingForm = styled.form`
  padding: 1.5rem;
  border: 1px solid #e8ecef;
  background: #f8f9fa;
  
  >div:first-child{ 
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: 2rem; 
  }
  
  div:last-child{
    background: white;
    border: 1px solid #eff0f2;
    text-align: end;
  }
  
  input{
    width: 100%;
    height: 7rem;
    border: 1px solid #eff0f2;
  }
`;

const Filter = styled.ul`
  display: flex;
  list-style: disc;
  padding-block-end: 1rem;
  margin-block: 2rem;
  border-bottom: 1px solid #3E4042;
  
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

const RatingBars = styled.ul`
  padding: 1rem;
  li{
    display: grid;
    grid-template-columns: 1fr 8fr;
    align-items: center;
    padding-block: .1rem;
  }
`;

const Image = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;

  margin-inline-end: 2rem;
`;

const Rating = styled.div`
  display: flex;
  margin-block-end: .5rem;

  > div{
    margin-inline-end: .3rem;
  }
`;

const Author = styled.p`
  color: #868E96;
`;

const Date = styled.p`
  color: #868E96;
`;

const MoreReviews = styled(PrimaryButton)`
  width: 100%;
`;

export default function Reviews() {
  const courseId = window.location.pathname.split('/')[2];

  const ratingStore = useRatingStore();
  const ratingFormStore = useRatingFormStore();
  const paymentStore = usePaymentStore();

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (ratingFormStore.content.length < 5) {
      return;
    }

    const rating = ['content', 'rating'].reduce((acc, key) => ({
      ...acc,
      [key]: ratingFormStore[key],
    }), {});

    ratingStore.rate({ ...rating, courseId });

    ratingFormStore.reset();
  };

  const handleLoadMoreReviews = () => {

  };

  useEffect(() => {
    ratingStore.fetchRatings();
    ratingStore.fetchMyReviews();
    paymentStore.fetchMyPayments();
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
                .length || 0).toFixed(1)}
          </p>
          <ReactStars
            edit={false}
            value={+(ratingStore.ratings
              .filter((rating) => rating.courseId === +courseId)
              .reduce((acc, cur) => acc + cur.rating, 0)
              / ratingStore.ratings
                .filter((rating) => rating.courseId === +courseId)
                .length || 0).toFixed(1)}

          />
          <p>
            {ratingStore.ratings
              .filter((rating) => rating.courseId === +courseId)
              .length}
            개의 수강평
          </p>
        </div>
        <div>
          <RatingBars>
            {[5, 4, 3, 2, 1]
              .map((number, i) => (
                <li key={i}>
                  <p>
                    {number}
                    점
                    {' '}
                  </p>
                  <Line
                    strokeColor="#FFC501"
                    percent={percentageFormat(ratingStore.ratings
                      .filter((rating) => rating.courseId === +courseId)
                      .filter((rating) => rating.rating === number)
                      .length
                      / ratingStore.ratings
                        .filter((rating) => rating.courseId === +courseId)
                        .length)}
                  />
                </li>
              ))}
          </RatingBars>
        </div>
      </Statistics>
      {/* {(JSON.stringify(paymentStore.payments
        .find((payment) => payment.courseId === +courseId))
        + JSON.stringify(
          !ratingStore.myReviews
            .find((review) => review.courseId === courseId),
        )
      )} */}
      {/* {(paymentStore.payments
        .filter((payment) => payment.courseId === +courseId)
        .length
        && !ratingStore.myReviews
          .filter((review) => review.courseId === +courseId)
          .length) */}
      {(paymentStore.payments
        .find((payment) => payment.courseId === +courseId)
        && !ratingStore.myReviews
          .find((review) => review.courseId === +courseId)
      )
        ? (
          <RatingForm onSubmit={handleSubmitReview}>
            <div>
              <ReactStars
                value={1}
                count={5}
                onChange={(value) => ratingFormStore.changeRating(value)}
                size={24}
                activeColor="#ffd700"
              />
              별점을 선택해주세요
            </div>
            <div>
              <label hidden htmlFor="input-review">수강평</label>
              <input
                id="input-reviews"
                placeholder="좋은 수강평을 남겨주시면 지식공유자와 이후 배우는 사람들에게 큰 도움이 됩니다!(5자 이상)"
                value={ratingFormStore.content}
                onChange={(e) => ratingFormStore.changeContent(e.target.value)}
              />
              <SecondaryButton type="submit">등록</SecondaryButton>
            </div>
          </RatingForm>
        )
        : null}
      <Filter>
        <li>
          VIEW
        </li>
      </Filter>
      <ul>
        {ratingStore.ratings
          .filter((rating) => rating.courseId === +courseId)
          .map((rating) => (
            <Review key={rating.id}>
              <div>
                <Image src="/assets/images/default-profile.png" alt="" />
                <div>
                  <Rating>
                    <ReactStars
                      edit={false}
                      value={rating.rating}
                    />
                    <p>
                      (
                      {rating.rating}
                      )
                    </p>
                  </Rating>
                  <Author>{rating.author}</Author>
                </div>
              </div>
              <div>
                {rating.content}
              </div>
              <Date>
                {dateFormat.defaultFormat(rating.createdAt)}
              </Date>
            </Review>
          ))}
      </ul>
      {/* <MoreReviews onClick={handleLoadMoreReviews}>수강평 더보기</MoreReviews> */}
    </div>
  );
}
