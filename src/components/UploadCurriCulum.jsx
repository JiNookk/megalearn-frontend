/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModifyingLectureModal from './modals/ModifyingLectureModal';
import SectionModal from './modals/SectionModal';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';
import useSectionStore from '../hooks/useSectionStore';

export default function UploadCurriCulum() {
  const [isLectureModal, setIsLectureModal] = useState(false);
  const [isSectionModal, setIsSectionModal] = useState(false);

  // const { state } = useLocation();
  // const { courseId } = state;

  const courseId = window.location.pathname.split('/')[2];

  const courseStore = useCourseStore();
  const sectionStore = useSectionStore();
  const lectureStore = useLectureStore();

  const handleAddSection = () => {
    setIsSectionModal(true);
  };

  const handleAddLecture = (sectionId) => {
    lectureStore.save({ title: '', courseId, sectionId });
  };

  const handleModifySection = (section) => {
    setIsSectionModal(true);
    sectionStore.setModifyingSection(section);
  };

  const handleDeleteSection = (section) => {
    sectionStore.delete({ sectionId: section.id });
  };

  const handleModifyLecture = (lecture) => {
    setIsLectureModal(true);
    lectureStore.setModifyingLecture(lecture);
  };

  const handleDeleteLecture = (lecture) => {
    lectureStore.delete({ lectureId: lecture.id });
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId });
    lectureStore.fetchLecturesByCourseId({ courseId });
    sectionStore.fetchSectionsByCourseId({ courseId });
  }, []);

  return (
    <div>
      <h2>
        커리큘럼
      </h2>
      <button type="button" onClick={handleAddSection}>섹션 추가</button>
      {sectionStore.sections
        ?.map((section, sectionIndex) => (
          <div key={section.id}>
            <p>
              {`섹션 ${sectionIndex}: ${section.title}`}
            </p>

            <button
              type="button"
              onClick={() => handleAddLecture(section.id)}
            >
              수업 추가
            </button>
            <button
              type="button"
              onClick={() => handleModifySection(section)}
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => handleDeleteSection(section)}
            >
              삭제
            </button>
            {lectureStore.lectures
              ?.filter((lecture) => lecture.sectionId === section.id)
              ?.map((lecture, lectureIndex) => (
                <div key={lecture.id}>
                  <p>
                    {`수업 ${lectureIndex}: ${lecture.title}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleModifyLecture(lecture)}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteLecture(lecture)}
                  >
                    삭제
                  </button>
                </div>
              ))}
          </div>
        ))}
      <Link to={`/courses/${courseId}/edit/cover_image`}>저장 후 다음이동</Link>
      {isLectureModal && (
        <ModifyingLectureModal
          lecture={lectureStore.modifyingLecture}
          onIsModal={setIsLectureModal}
        />
      )}
      {isSectionModal && (
        <SectionModal
          onIsModal={setIsSectionModal}
          courseId={courseId}
        />
      )}
    </div>
  );
}
