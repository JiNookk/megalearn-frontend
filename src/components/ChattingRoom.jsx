import moment from 'moment';
import styled from 'styled-components';
import dateFormat from '../dateFormat';
import useChattingFormStore from '../hooks/useChattingFormStore';
import useLectureStore from '../hooks/useLectureStore';
import useMessageStore from '../hooks/useMessageStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ChattingRoom() {
  const lectureStore = useLectureStore();
  const chattingFormStore = useChattingFormStore();
  const messageStore = useMessageStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = {
      author: 'tester',
      content: chattingFormStore.message,
      time: moment().format(),
    };

    messageStore.save(message);
  };

  return (
    <Container>
      <h2>
        {lectureStore.lecture.title}
        {' '}
        채팅방
      </h2>

      <ul>
        {messageStore.messages.map((message) => (
          <li key={message.id}>
            {message.author}
            {' '}
            -
            {' '}
            {message.content}
            <p>
              {dateFormat(message.time)}
            </p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="input-message">채팅</label>
        <input
          id="input-message"
          type="text"
          value={chattingFormStore.message}
          onChange={(e) => chattingFormStore.changeMessage(e.target.value)}
        />
        <button type="submit">전송하기</button>
      </form>
    </Container>
  );
}
