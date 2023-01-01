import { useEffect } from 'react';
import styled from 'styled-components';
import useLectureModifyingFormStore from '../../hooks/useLectureModifyingFormStore';
import useLectureStore from '../../hooks/useLectureStore';

const Form = styled.form`
  width: 300px;
  height: 200px;
  
  z-index: 999;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border: 1px solid black;
  border-radius: 8px;

  text-align: center;
`;

export default function ModifyingLectureModal({ onIsModal, lecture }) {
  const lectureModifyingFormStore = useLectureModifyingFormStore();
  const lectureStore = useLectureStore();

  const handleSubmit = (event) => {
    const lectureProperties = ['title', 'videoUrl', 'lectureNote', 'filePath']
      .reduce((acc, key) => ({
        ...acc,
        [key]: lectureModifyingFormStore[key],
      }), {});

    lectureStore.update({ ...lectureProperties, lectureId: lecture.id });

    lectureModifyingFormStore.reset();

    onIsModal(false);
    event.preventDefault();
  };

  const handleCancel = () => {
    onIsModal(false);
  };

  useEffect(() => {
    lectureModifyingFormStore.changeTitle(lecture?.title);
    lectureModifyingFormStore.changeVideoUrl(lecture?.videoUrl);
    lectureModifyingFormStore.changeLectureNote(lecture?.lectureNote);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input-title">제목</label>
        <input
          type="text"
          id="input-title"
          value={lectureModifyingFormStore.title}
          onChange={(e) => lectureModifyingFormStore.changeTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-videoUrl">영상 업로드</label>
        <input
          type="text"
          id="input-videoUrl"
          value={lectureModifyingFormStore.videoUrl}
          onChange={(e) => lectureModifyingFormStore.changeVideoUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-lectureNote">수업 노트 작성</label>
        <input
          type="text"
          id="input-lectureNote"
          value={lectureModifyingFormStore.lectureNote}
          onChange={(e) => lectureModifyingFormStore.changeLectureNote(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-file">자료 파일 업로드</label>
        <input
          type="file"
          id="input-file"
          onInput={(e) => lectureModifyingFormStore.changeFilePath(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleCancel}>취소</button>
      <button type="submit">저장</button>
    </Form>
  );
}
