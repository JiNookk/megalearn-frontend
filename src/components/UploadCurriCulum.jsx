/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModifyingLectureModal from './modals/ModifyingLectureModal';
import SectionModal from './modals/SectionModal';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';
import useSectionStore from '../hooks/useSectionStore';
import SubTitle from './ui/SubTitle';
import Title from './ui/Title';

const Container = styled.div`
  flex: 1;
  background: white;
  padding: 2.5rem 1.25rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;

  >p{
    margin-block: 1rem;
    color: #ABB0B5;
  }

  button{
    display: flex;
    align-items: center;
    background: none;
    border: none;
  }
`;

const Guide = styled.div`
  padding: 1rem;
  background: #F7F7F7;
  margin-block: 2.5rem;
  
  h3{
    margin-bottom: .5rem;
  }

  div{
    margin-block: 1.5rem;
  }

  p{
    margin-block: .5rem
  }
`;

const CurriCulum = styled.div`
  padding: 1rem;
  margin-block: 2rem;
  border: 1px solid #75E6C7;  
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;

  p{
    font-size: 1.25rem;
    font-weight: bold;
    margin-block: 1.5rem;
  }
`;

const Lecture = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-block: .5rem;
  border: 1px solid #D9D9D9;
`;

const SectionAddButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-block: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const LinkWrapper = styled.div`
  margin-block: 2rem;
  text-align: center;

  a{
    display: inline-block;
    padding: 1rem .5rem;
    border: 1px solid #D3DADD;
    border-radius: 4px;
  }
`;

export default function UploadCurriCulum() {
  const [isLectureModal, setIsLectureModal] = useState(false);
  const [isSectionModal, setIsSectionModal] = useState(false);

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
    <Container>
      <p>
        강의제작
      </p>
      <Title>
        커리큘럼
      </Title>
      <Guide>
        <div>
          <SubTitle>
            영상 등록
          </SubTitle>
          <p>
            강의의 커리큘럼을 모두 작성한 뒤 수업마다 영상을 연결해 주셨나요?
          </p>
          <p>
            강의 커리큘럼이 확정되지 않으면 강의를 오픈할 수 없습니다.
          </p>
        </div>
        <div>
          <SubTitle>
            여러개의 섹션으로 나눠주세요
          </SubTitle>
          <p>
            수업들을 여러 섹션으로 잘게 묶어 놓으면 학생들이 훨씬 효과적으로 학습할 수 있습니다.
          </p>
          <p>
            보통 1개 섹션당 4~6개의 수업으로 구성하면 좋아요!
          </p>
        </div>
      </Guide>
      <SectionAddButtonWrapper>
        <button type="button" onClick={handleAddSection}>
          <img src="/assets/images/plus-circle.png" alt="add-lecture" />
          {' '}
          섹션 추가하기
        </button>
      </SectionAddButtonWrapper>
      <CurriCulum>
        {sectionStore.sections
          ?.map((section, sectionIndex) => (
            <div key={section.id}>
              <Section>
                <p>
                  {`섹션 ${sectionIndex}: ${section.title}`}
                </p>
                <ButtonsWrapper>
                  <button
                    type="button"
                    onClick={() => handleAddLecture(section.id)}
                  >
                    <img src="/assets/images/plus-circle.png" alt="add-lecture" />
                    {' '}
                    <span>
                      수업 추가하기
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModifySection(section)}
                  >
                    <img src="/assets/images/edit.png" alt="edit" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(section)}
                  >
                    <img src="/assets/images/trash.png" alt="trash" />
                  </button>
                </ButtonsWrapper>
              </Section>
              {lectureStore.lectures
                ?.filter((lecture) => lecture.sectionId === section.id)
                ?.map((lecture, lectureIndex) => (
                  <Lecture key={lecture.id}>
                    <p>
                      {`수업 ${lectureIndex}: ${lecture.title}`}
                    </p>
                    <ButtonsWrapper>
                      <button
                        type="button"
                        onClick={() => handleModifyLecture(lecture)}
                      >
                        <img src="/assets/images/edit.png" alt="edit" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLecture(lecture)}
                      >
                        <img src="/assets/images/trash.png" alt="trash" />
                      </button>
                    </ButtonsWrapper>
                  </Lecture>
                ))}
            </div>
          ))}
      </CurriCulum>
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
      <LinkWrapper>
        <Link to={`/courses/${courseId}/edit/cover_image`}>저장 후 다음이동</Link>
      </LinkWrapper>
    </Container>
  );
}
