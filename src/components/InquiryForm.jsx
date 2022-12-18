import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import getQueryParam from '../utils/getQueryParam';
import useInquiryPostFormStore from '../hooks/useInquiryPostFormStore';
import useInquiryStore from '../hooks/useInquiryStore';
import ErrorModal from './ErrorModal';
import useVideoStore from '../hooks/useVideoStore';

export default function InquiryForm({ onNavigate }) {
  const [isModal, setIsModal] = useState(false);
  const { state } = useLocation();
  const { courseId, lectureId } = state;
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
        title, lectureId, hashTags, content, anonymous, minute, second,
      })
    );

    onNavigate({ tab: 'inquiryBoard', ids: { lectureId, courseId } });

    inquiryPostFormStore.reset();
  };

  return (
    <form onSubmit={handleSubmitInquiry}>
      <h2>{type === 'update' ? '수정하기' : '질문하기'}</h2>
      <div>
        <label htmlFor="input-title">제목</label>
        <input
          id="input-title"
          type="text"
          placeholder="제목을 입력하세요"
          value={inquiryPostFormStore.title}
          onChange={(e) => inquiryPostFormStore.changeTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-hashTags">해시태그</label>
        <input
          id="input-hashTags"
          type="text"
          placeholder="# 태그"
          value={inquiryPostFormStore.hashTags}
          onChange={(e) => inquiryPostFormStore.changeHashTags(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="input-content">질문 내용</label>
        <input
          id="input-content"
          type="text"
          placeholder="무슨 생각을 하고 있나요? 궁금증을 풀어봐요!"
          value={inquiryPostFormStore.content}
          onChange={(e) => inquiryPostFormStore.changeContent(e.target.value)}
        />
      </div>
      <div>
        강의시간
        <label htmlFor="input-minute">분</label>
        <input
          id="input-minute"
          type="number"
          placeholder="분"
          value={inquiryPostFormStore.minute === ''
            ? videoStore.currentTime().minute
            : inquiryPostFormStore.minute}
          onChange={(e) => inquiryPostFormStore.changeMinute(e.target.value)}
        />
        <label htmlFor="input-second">초</label>
        <input
          id="input-second"
          type="number"
          placeholder="초"
          value={inquiryPostFormStore.second === ''
            ? videoStore.currentTime().second
            : inquiryPostFormStore.second}
          onChange={(e) => inquiryPostFormStore.changeSecond(e.target.value)}
        />
      </div>
      {type !== 'update' && (
        <div>
          <label htmlFor="input-anonymous">익명</label>
          <input
            id="input-anonymous"
            type="checkbox"
            onChange={(e) => inquiryPostFormStore.changeAnonymous(e.target.value)}
          />
        </div>
      )}
      <button type="submit">
        올리기
      </button>
      {isModal && <ErrorModal onIsModal={setIsModal} />}
    </form>
  );
}
