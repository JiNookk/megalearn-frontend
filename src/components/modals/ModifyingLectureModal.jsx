import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import useLectureModifyingFormStore from '../../hooks/useLectureModifyingFormStore';
import useLectureStore from '../../hooks/useLectureStore';
import useVideoStore from '../../hooks/useVideoStore';

const Form = styled.form`
  /* width: 300px;
  height: 200px; */
  
  z-index: 999;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;

  >div{
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block: 1rem;
  }

  input{
    width: 100%;
    padding: 1rem;
    margin-block-end: .5rem;
    border:none;
    background: #F7F7F7;
  }

  >div:last-child{
    justify-content: end;
  }
`;

export default function ModifyingLectureModal({ onIsModal, lecture }) {
  const lectureModifyingFormStore = useLectureModifyingFormStore();
  const lectureStore = useLectureStore();
  const videoStore = useVideoStore();

  const handleUploadUrl = (e) => {
    lectureModifyingFormStore.changeVideoUrl(e.target.value);
  };

  const handleSubmit = (event) => {
    lectureModifyingFormStore.changeLectureTime(videoStore.totalTime());

    const lectureProperties = ['title', 'videoUrl', 'lectureNote', 'filePath', 'lectureTime']
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
        <label hidden htmlFor="input-title">제목</label>
        <input
          type="text"
          id="input-title"
          placeholder="제목을 입력해주세요."
          value={lectureModifyingFormStore.title}
          onChange={(e) => lectureModifyingFormStore.changeTitle(e.target.value)}
        />
      </div>
      <div>
        <label hidden htmlFor="input-videoUrl">영상 업로드</label>
        <input
          type="text"
          id="input-videoUrl"
          placeholder="유튜브 영상 id를 입력해주세요."
          value={lectureModifyingFormStore.videoUrl}
          onChange={handleUploadUrl}
        />
      </div>
      <ReactPlayer
        hidden
        id="react-player"
        url={`https://www.youtube.com/watch?v=${lectureModifyingFormStore.videoUrl}`}
        ref={videoStore.ref}
        playing={videoStore.isPlay}
        muted
        controls={videoStore.control}
        width={videoStore.width}
        height={videoStore.height}
      />
      <div>
        <label hidden htmlFor="input-lectureNote">수업 노트 작성</label>
        <input
          type="text"
          id="input-lectureNote"
          placeholder="수업 노트를 작성해주세요."
          value={lectureModifyingFormStore.lectureNote}
          onChange={(e) => lectureModifyingFormStore.changeLectureNote(e.target.value)}
        />
      </div>
      <div>
        <label hidden htmlFor="input-file">자료 파일 업로드</label>
        <input
          type="file"
          id="input-file"
          onInput={(e) => lectureModifyingFormStore.changeFilePath(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleCancel}>취소</button>
        <button type="submit">저장</button>
      </div>
    </Form>
  );
}
