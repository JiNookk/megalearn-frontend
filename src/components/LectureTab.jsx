import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import getQueryParam from '../utils/getQueryParam';
import InquiryBoard from './InquiryBoard';
import Inquiry from './Inquiry';
import InquiryForm from './InquiryForm';
import Notes from './Notes';
import CurriCulum from './CurriCulum';
import CurriCulumTab from './CurriCulumTab';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* width: 100%; */
`;

const Article = styled.article`
  width: 30vw;
  padding: 0 3rem;
`;

const TabButtons = styled.article`
  display: flex;
  flex-direction: column;
`;

const ExitButton = styled.button`
  width: 30px;
  height: 30px;
  
  z-index: 999;
  
  position: absolute;
  top: 25%;
  right: 8%;
  transform: translate(-50%, -50%);
    
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;

  text-align: center;
`;

export default function LectureTab() {
  const [isTabOn, setIsTabOn] = useState(false);

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

  const handleClickCurriCulum = () => {
    setIsTabOn(true);

    onNavigate({ tab: 'curriculum', ids: { courseId, lectureId } });
  };

  const handleClickInquiryBoard = () => {
    setIsTabOn(true);

    onNavigate({ tab: 'inquiryBoard', ids: { courseId, lectureId } });
  };

  const handleClickNotes = () => {
    setIsTabOn(true);

    onNavigate({ tab: 'notes', ids: { courseId, lectureId } });
  };

  const handleTabOff = () => {
    setIsTabOn(false);
  };

  return (
    <Container>
      {isTabOn && (
        <Article>
          {category === 'curriculum' ? (<CurriCulumTab onNavigate={onNavigate} />) : null}
          {category === 'inquiryBoard' ? (<InquiryBoard onNavigate={onNavigate} />) : null}
          {category === 'post' ? (<InquiryForm onNavigate={onNavigate} />) : null}
          {category === 'update' ? (<InquiryForm onNavigate={onNavigate} />) : null}
          {category === 'inquiry' ? (<Inquiry onNavigate={onNavigate} />) : null}
          {category === 'notes' ? (<Notes onNavigate={onNavigate} />) : null}
          <ExitButton type="button" onClick={handleTabOff}>X</ExitButton>
        </Article>
      )}

      <TabButtons>
        <button type="button" onClick={handleClickCurriCulum}>
          목차
        </button>
        <button type="button" onClick={handleClickInquiryBoard}>
          질문하기
        </button>
        <button type="button" onClick={handleClickNotes}>
          노트
        </button>
      </TabButtons>
    </Container>
  );
}
