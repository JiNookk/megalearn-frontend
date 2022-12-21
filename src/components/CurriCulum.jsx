import useLecturesStore from '../hooks/useLecturesStore';

export default function CurriCulum({ onNavigate }) {
  const lecturesStore = useLecturesStore();

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
          {lecturesStore.lectures.map((lecture) => (
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
