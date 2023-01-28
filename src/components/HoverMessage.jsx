import moment from 'moment';
import styled from 'styled-components';
import { timeFormat } from '../utils/TimeFormat';

const Message = styled.div`
  position: absolute;
  transition: top 1s ease-in; 
  top: 50px;
  left: 30px;
  width: 150px;
  padding: 1rem;
  border: 1px solid black;
  border-radius: .5rem;
  background: white;
  z-index: 999;
  text-align: start;

  h3{
    font-size: .8rem;
  }
`;

const List = styled.dl`
  font-size: .8rem;
  display: grid;
  grid: 1fr 1fr 1fr / 1fr 4fr 2fr;
  gap: 10px;
  margin-block-start: 1rem;

  dt{
    font-weight: bold;
  }
`;

const NoteColor = styled.p`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: none;
  background-color: #3cc9db;
`;

const TimeColor = styled.p`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: none;
  background-color: #758ffc;
`;

const CountColor = styled.p`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: none;
  background-color: #da77f2;
`;

export default function HoverMessage({
  date, id, hover, lectureCount, lectureTime, noteCount,
}) {
  return (
    <div
      className={`${hover !== 0 ? 'hover' : 'none'}`}
    >
      {hover === id && (
        <Message className="hover-text">
          <h3>
            {moment(date).format('YYYY.MM.DD')}
            {' '}
            {['일', '월', '화', '수', '목', '금', '토'][moment(date).days()]}
          </h3>
          <List>
            <NoteColor />
            <dd>
              {' '}
              노트:
            </dd>
            <dt>
              {noteCount}
              개
            </dt>
            <TimeColor />
            <dd>
              총 학습:
            </dd>
            <dt>
              {timeFormat.getMinutes({ seconds: lectureTime })}
              분
            </dt>
            <CountColor />
            <dd>
              완료 수업:
            </dd>
            <dt>
              {lectureCount}
              개
            </dt>
          </List>
        </Message>
      )}
    </div>
  );
}
