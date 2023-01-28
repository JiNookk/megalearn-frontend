import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import getQueryParam from '../../utils/getQueryParam';
import InquiryBoard from '../InquiryBoard';
import Inquiry from '../Inquiry';
import InquiryForm from '../forms/InquiryForm';
import Notes from '../Notes';
import CurriCulumTab from './CurriCulumTab';
import { TabContainer } from '../ui/Tab';

const Article = styled.article`
  min-height: 100vh;
  width: 30vw;
  position: relative;
`;

const TabButtonWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  border: 1px solid #b5b5b5;
  background-color: #F8F9FA;

  button{
    height: 28px;
    margin-bottom: 3rem;
    border: none;
    background: none;
  }
`;

const ExitButton = styled.button`
  font-size: large;
  z-index: 999;
  position: absolute;
  top: 2%;
  right: 0%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  border-radius: 8px;
  text-align: center;
`;

export default function LectureTab() {
  const [isTabOn, setIsTabOn] = useState(false);

  const courseId = window.location.pathname.split('/')[2];
  const lectureId = window.location.pathname.split('/')[4];

  const category = getQueryParam({ category: 'tab' });

  const navigate = useNavigate();

  const onNavigate = ({ tab, ids }) => {
    navigate(`/courses/${courseId}/lectures/`
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

  useEffect(() => {
    if (category) {
      setIsTabOn(true);
    }
  }, []);

  return (
    <TabContainer>
      {isTabOn && (
        <Article>
          {category === 'curriculum' ? (<CurriCulumTab onTabOff={setIsTabOn} />) : null}
          {category === 'inquiryBoard' ? (<InquiryBoard onNavigate={onNavigate} />) : null}
          {category === 'post' ? (<InquiryForm onNavigate={onNavigate} />) : null}
          {category === 'update' ? (<InquiryForm onNavigate={onNavigate} />) : null}
          {category === 'inquiry' ? (<Inquiry onNavigate={onNavigate} />) : null}
          {category === 'notes' ? (<Notes onNavigate={onNavigate} />) : null}
          <ExitButton type="button" onClick={handleTabOff}>X</ExitButton>
        </Article>
      )}
      <TabButtonWrapper>
        <button type="button" onClick={handleClickCurriCulum}>
          <img src="/assets/images/chapter.png" alt="chapter" />
        </button>
        <button type="button" onClick={handleClickInquiryBoard}>
          <img src="/assets/images/inquiry.png" alt="inquiry" />
        </button>
        <button type="button" onClick={handleClickNotes}>
          <img src="/assets/images/note.png" alt="note" />
        </button>
      </TabButtonWrapper>
    </TabContainer>
  );
}
