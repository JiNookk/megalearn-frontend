import ReactPlayer from 'react-player';
import styled from 'styled-components';
import useLectureStore from '../hooks/useLectureStore';
import useVideoStore from '../hooks/useVideoStore';

const Container = styled.div`
  width: 100%;
  margin-block: 2rem;
`;

const ButtonContainer = styled.article`
  text-align: center;
`;

export default function Lecture() {
  const lectureStore = useLectureStore();
  const videoStore = useVideoStore();

  return (
    <Container>
      <article>
        <p>
          {lectureStore.lecture.title}
        </p>
      </article>

      <ReactPlayer
        id="react-player"
        url={`https://www.youtube.com/watch?v=${lectureStore.lecture.videoUrl}`}
        ref={videoStore.ref}
        playing={videoStore.isPlay}
        controls={videoStore.control}
        // loop={isLoop}
        width={videoStore.width}
        height={videoStore.height}
      />
      <ButtonContainer>
        <button type="button">
          재생하기
        </button>
        <button type="button">
          이전 수업
        </button>
        <button type="button">
          다음 수업
        </button>
      </ButtonContainer>
    </Container>
  );
}
