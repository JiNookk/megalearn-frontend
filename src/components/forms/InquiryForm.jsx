import { useState } from 'react';
import styled from 'styled-components';
import getQueryParam from '../../utils/getQueryParam';
import useInquiryPostFormStore from '../../hooks/useInquiryPostFormStore';
import useInquiryStore from '../../hooks/useInquiryStore';
import ErrorModal from '../modals/ErrorModal';
import useVideoStore from '../../hooks/useVideoStore';
import TextEditor from '../../utils/TextEditor';
import Title from '../ui/Title';
import Button from '../ui/Button';
import PrimaryButton from '../ui/PrimaryButton';
import placeholders from '../../placeholders/placeholders';

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  padding: 1.5rem;
  padding-block-end: 0;
  
  input{
    padding: .5rem;
    margin-block: .5rem 1.5rem;
    border: 1px solid #D3DADD;
  }
`;

const Content = styled.div`
  input{
    width: 100%;
  }
`;

const Label = styled.label`
  display: block;
`;

const InputTime = styled.div`
  input{
    margin-block: .5rem 1.5rem;
  }
`;

const TextEditorWrapper = styled.div`
  flex: 1;
`;

const Anonymous = styled.div`
  margin-block: .5rem 1.5rem;  
`;

const ButtonsWrapper = styled.div`
  position: sticky;
  background-color: white;
  right: 1.5rem;
  bottom: 0%;
  padding-bottom: 1.5rem;
  text-align: end;

  button{
    padding: 1rem 1.5rem;
    margin-inline-start: 1rem;
  }

  button:last-child{
    background-color: black;
    color: white;
  }
`;

export default function InquiryForm({ onNavigate }) {
  const [isModal, setIsModal] = useState(false);

  const courseId = window.location.pathname.split('/')[2];
  const lectureId = window.location.pathname.split('/')[4];

  const videoStore = useVideoStore();

  const type = getQueryParam({ category: 'tab' });
  const inquiryId = getQueryParam({ category: 'inquiryId' });

  const inquiryPostFormStore = useInquiryPostFormStore();
  const inquiryStore = useInquiryStore();

  const handleSubmitInquiry = (event) => {
    event.preventDefault();

    if (!inquiryPostFormStore.content || !inquiryPostFormStore.title) {
      setIsModal(true);
      return;
    }

    const {
      title, hashTags, content, anonymous, minute, second,
    } = inquiryPostFormStore;

    // eslint-disable-next-line no-unused-expressions
    type === 'update' ? (
      inquiryStore.updateInquiry({
        title, hashTags, content, inquiryId, minute, second,
      })
    ) : (
      inquiryStore.post({
        title, courseId, lectureId, hashTags, content, anonymous, minute, second,
      })
    );

    onNavigate({ tab: 'inquiryBoard', ids: { lectureId, courseId } });

    inquiryPostFormStore.reset();
  };

  return (
    <Form onSubmit={handleSubmitInquiry}>
      <Title>{type === 'update' ? '수정하기' : '질문하기'}</Title>
      <Content>
        <Label htmlFor="input-title">제목</Label>
        <input
          id="input-title"
          type="text"
          placeholder="제목을 입력하세요"
          value={inquiryPostFormStore.title}
          onChange={(e) => inquiryPostFormStore.changeTitle(e.target.value)}
        />
        {/* <Label htmlFor="input-hashTags">해시태그</Label>
        <input
          id="input-hashTags"
          type="text"
          placeholder="# 태그"
          value={inquiryPostFormStore.hashTags}
          onChange={(e) => inquiryPostFormStore.changeHashTags(e.target.value)}
        /> */}
      </Content>
      <InputTime>
        <p>
          강의시간
        </p>
        <label hidden htmlFor="input-minute">분</label>
        <input
          id="input-minute"
          type="number"
          placeholder="분"
          value={inquiryPostFormStore.minute === ''
            ? videoStore.currentTime().minute
            : inquiryPostFormStore.minute}
          onChange={(e) => inquiryPostFormStore.changeMinute(e.target.value)}
        />
        <label hidden htmlFor="input-second">초</label>
        <input
          id="input-second"
          type="number"
          placeholder="초"
          value={inquiryPostFormStore.second === ''
            ? videoStore.currentTime().second
            : inquiryPostFormStore.second}
          onChange={(e) => inquiryPostFormStore.changeSecond(e.target.value)}
        />
      </InputTime>
      {type !== 'update' && (
        <Anonymous>
          <label htmlFor="input-anonymous">익명</label>
          <input
            id="input-anonymous"
            type="checkbox"
            onChange={(e) => inquiryPostFormStore.changeAnonymous(e.target.value)}
          />
        </Anonymous>
      )}
      <TextEditorWrapper>
        <TextEditor type="inquiry" height={800} placeholder={placeholders.inquiry} />
      </TextEditorWrapper>
      <ButtonsWrapper>
        <PrimaryButton type="button">
          취소
        </PrimaryButton>
        <Button type="submit">
          확인
        </Button>
      </ButtonsWrapper>
      {isModal && <ErrorModal onIsModal={setIsModal} />}
    </Form>
  );
}
