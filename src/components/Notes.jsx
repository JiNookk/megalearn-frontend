import NoteForm from './NoteForm';

export default function Notes({ onNavigate }) {
  return (
    <article>
      <div>
        <h2>
          노트
        </h2>
        <span>
          내 노트 모두보기
        </span>
      </div>
      <div>
        <p>
          작성된 노트는 본인에게만 보입니다 :)
        </p>
        <p>
          수업 내용을 간단히 메모해보세요!
        </p>
      </div>
      <NoteForm />
    </article>
  );
}
