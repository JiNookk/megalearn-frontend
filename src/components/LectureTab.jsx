import { useState } from 'react';
import styled from 'styled-components';
import ChattingRoom from './ChattingRoom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LectureTab() {
  const [tab, setTab] = useState('');

  const handleClick = () => {
    setTab('chattingRoom');
  };

  return (
    <Container>
      {tab === 'chattingRoom' ? (
        <ChattingRoom />
      ) : null}
      <div>
        <button type="button" onClick={handleClick}>
          채팅방
        </button>
      </div>
    </Container>
  );
}
