import { render, screen } from '@testing-library/react';
import Lecture from './Lecture';

const handleNavigate = jest.fn();

test('Lecture', () => {
  const lecture = {
    id: 1,
    title: '강의 1',
    videoPath: '영상 주소',
    // 메시지, 목차, 채팅방을 어떻게 들고올까?
  };

  render((
    <Lecture lecture={lecture} handleNavigate={handleNavigate} />
  ));

  screen.getByText('강의 1');
  screen.getByText('재생하기');
  screen.getByText('이전 수업');
  screen.getByText('다음 수업');
});
