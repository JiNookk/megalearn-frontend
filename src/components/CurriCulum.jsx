import useLectureStore from '../hooks/useLectureStore';

export default function CurriCulum({ onNavigate }) {
  const lectureStore = useLectureStore();

  const handleClickLecture = (lectureId) => {
    onNavigate({ lectureId });
  };

  return (
    <article>
      <h2>커리큘럼</h2>
      <table>
        <tbody>
          <tr>
            <th>
              섹션 0. 테스트
            </th>
          </tr>
          {lectureStore.lectures.map((lecture) => (
            <tr key={lecture.id} onClick={() => handleClickLecture(lecture.id)}>
              <th>
                {lecture.title}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
