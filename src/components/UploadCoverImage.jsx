import { Link } from 'react-router-dom';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';

export default function UploadCoverImage() {
  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleUpload = (thumbnailPath) => {
    courseFormStore.changeThumbnailPath(thumbnailPath);
    courseStore.update({ courseId, thumbnailPath });
  };

  return (
    <article>
      <h2>
        강의 제작
      </h2>
      <h3>
        커버 이미지
      </h3>

      <div>
        <p>강의를 대표하는 이미지를 업로드해주세요.</p>
        <label hidden htmlFor="input-thumbnail">파일 선택</label>
        <input
          id="input-thumbnail"
          type="file"
          placeholder="커버 이미지를 선택해주세요."
          onInput={(e) => handleUpload(e.target.value)}
        />
      </div>
      <Link to={`/courses/${courseId}/edit/course_setting`}>
        저장 후 다음이동
      </Link>
    </article>
  );
}
