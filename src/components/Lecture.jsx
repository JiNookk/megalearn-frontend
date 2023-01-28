import ReactPlayer from 'react-player';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useInterval } from 'usehooks-ts';
import useProgressStore from '../hooks/useProgressStore';
import useLectureStore from '../hooks/useLectureStore';
import useVideoStore from '../hooks/useVideoStore';
import useSectionStore from '../hooks/useSectionStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: white;
  background-color: black;
`;

const Heading = styled.div`
  padding-left: 1rem;
  font-size: 1.5rem;
  height: 4rem;
  line-height: 4rem;
  background-color: rgb(33,37,41);

  h2{
    display: inline-block;
    margin-left: 2rem;
  }

  a{
    font-size: 1rem;
    color: white
  }
`;

const Media = styled.div`
  flex: 1;
  padding-inline : 2rem;
`;

const ButtonContainer = styled.article`
  font-size: 1.5rem;
  padding-left: 5rem;
  padding-block: 1.4rem;
  text-align: center;
  background-color : #5F5F5F;  

  button{
    font-size: 1rem;
    background: none;
    border: none;
    margin-inline-end: 2rem;
    color: white;
  }
`;

export default function Lecture() {
  const navigate = useNavigate();

  const courseId = window.location.pathname.split('/')[2];
  const lectureId = window.location.pathname.split('/')[4];

  const lectureStore = useLectureStore();
  const sectionStore = useSectionStore();
  const videoStore = useVideoStore();
  const progressStore = useProgressStore();

  const handleLectureComplete = () => {
    const progressId = progressStore.progresses
      .find((progress) => progress.lectureId === +lectureId)
      .id;

    progressStore.completeLecture({ progressId })
      .then(() => {
        sectionStore.fetchSectionsByCourseId({ courseId });
        progressStore.fetchProgresses({ courseId });
      });
  };

  const handlePreviousLecture = () => {
    const previousLecture = lectureStore.previousLecture({ lectureId });

    navigate(`/courses/${courseId}/lectures/${previousLecture.id}`, {
      state: { courseId, lectureId: previousLecture.id },
    });
  };

  const handleNextLecture = () => {
    const nextLecture = lectureStore.nextLecture({ lectureId });

    navigate(`/courses/${courseId}/lectures/${nextLecture.id}`, {
      state: { courseId, lectureId: nextLecture.id },
    });
  };

  useInterval(() => {
    progressStore.updateTime({
      time: videoStore.currentTime(),
      progressId: progressStore.progress.id,
    });
  }, 10000);

  useEffect(() => {
    lectureStore.fetchLecturesByCourseId({ courseId });
    lectureStore.fetchLecture({ courseId, lectureId })
      .then(() => videoStore.play({ lectureTime: videoStore.lectureTime }));
  }, []);

  useEffect(() => {
    progressStore.fetchProgress({ lectureId });
  }, []);

  return (
    <Container>
      <Heading>
        <Link to={`/courses/${courseId}`}>
          {'강의 대시보드  '}
        </Link>
        <h2>
          {lectureStore.lecture.title}
        </h2>
      </Heading>
      <Media>
        <ReactPlayer
          id="react-player"
          url={`https://www.youtube.com/watch?v=${lectureStore.lecture.videoUrl}`}
          ref={videoStore.ref}
          playing={videoStore.isPlay}
          controls={videoStore.control}
          width={videoStore.width}
          height={videoStore.height}
          onEnded={handleLectureComplete}
        />
      </Media>
      <ButtonContainer>
        {lectureStore.previousLecture({ lectureId }).id && (
          <button type="button" onClick={handlePreviousLecture}>
            {'< 이전 수업'}
          </button>
        )}
        {lectureStore.nextLecture({ lectureId }).id && (
          <button type="button" onClick={handleNextLecture}>
            {'다음 수업 >'}
          </button>
        )}
      </ButtonContainer>
    </Container>
  );
}
