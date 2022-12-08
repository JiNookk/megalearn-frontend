import useLectureStore from '../hooks/useLectureStore';

export default function Lecture() {
  const lectureStore = useLectureStore();

  return (
    <div>
      <article>
        <p>
          {lectureStore.lecture.title}
        </p>
      </article>
      <iframe
        title={lectureStore.lecture.title}
        id="ytplayer"
        type="text/html"
        width="720"
        height="405"
        src={`https://www.youtube.com/embed/${lectureStore.lecture.videoPath}`}
        frameBorder="0"
        allowFullScreen
      />
      <article>
        <button type="button">
          재생하기
        </button>
        <button type="button">
          이전 수업
        </button>
        <button type="button">
          다음 수업
        </button>
      </article>
    </div>
  );
}
