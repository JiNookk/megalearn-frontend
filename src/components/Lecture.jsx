export default function Lecture({ lecture }) {
  return (
    <div>
      <article>
        <p>
          {lecture.title}
        </p>
      </article>
      <iframe
        title={lecture.title}
        id="ytplayer"
        type="text/html"
        width="720"
        height="405"
        src={`https://www.youtube.com/embed/${lecture.videoPath}`}
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
