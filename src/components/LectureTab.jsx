import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getQueryParam from '../utils/getQueryParam';
import InquiryBoard from './InquiryBoard';
import Inquiry from './Inquiry';
import InquiryForm from './InquiryForm';
import Notes from './Notes';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Article = styled.article`
  width: 100%;
  padding: 0 3rem;
`;

export default function LectureTab() {
  const { state } = useLocation();
  const { courseId, lectureId } = state;
  const category = getQueryParam({ category: 'tab' });

  const navigate = useNavigate();

  const onNavigate = ({ tab, ids }) => {
    navigate(`/courses/${courseId}/unit/`
    + `${lectureId}?tab=${tab}`, {
      state: { ...ids },
    });
  };

  const handleClickInquiryBoard = () => {
    onNavigate({ tab: 'inquiryBoard', ids: { courseId, lectureId } });
  };

  const handleClickNotes = () => {
    onNavigate({ tab: 'notes', ids: { courseId, lectureId } });
  };

  return (
    <Container>
      <Article>
        {category === 'inquiryBoard' ? (<InquiryBoard onNavigate={onNavigate} />) : null}
        {category === 'post' ? (<InquiryForm onNavigate={onNavigate} />) : null}
        {category === 'update' ? (<InquiryForm onNavigate={onNavigate} />) : null}
        {category === 'inquiry' ? (<Inquiry onNavigate={onNavigate} />) : null}
        {category === 'notes' ? (<Notes onNavigate={onNavigate} />) : null}
      </Article>

      <article>
        <button type="button" onClick={handleClickInquiryBoard}>
          질문하기
        </button>
        <button type="button" onClick={handleClickNotes}>
          노트
        </button>
      </article>
    </Container>
  );
}
