import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useCommentStore from '../hooks/useCommentStore';
import useInquiryStore from '../hooks/useInquiryStore';
import { dateFormat } from '../utils/dateFormat';
import CommentForm from './forms/CommentForm';
import CommentUpdateForm from './forms/CommentUpdateForm';

const List = styled.li`
  list-style: none;
`;

export default function Inquiry({ onNavigate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { state } = useLocation();
  const { inquiryId, courseId, lectureId } = state;

  const commentStore = useCommentStore();
  const inquiryStore = useInquiryStore();

  const handleUpdateInquiry = () => {
    onNavigate({ tab: `update&inquiryId=${inquiryId}`, ids: { courseId, lectureId } });
  };

  const handleDeleteInquiry = (id) => {
    inquiryStore.deleteInquiry({ inquiryId: id });
    onNavigate({ tab: 'inquiryBoard', ids: { courseId, lectureId } });
  };

  const handleUpdateComment = () => {
    setIsUpdating(true);
  };

  const handleDeleteComment = (commentId) => {
    commentStore.deleteComment({ commentId });
  };

  const handleLectureTime = () => {
    //
  };

  useEffect(() => {
    inquiryStore.fetchInquiry({ inquiryId });
    commentStore.fetchComments({ inquiryId });
  }, []);

  return (
    <div>

      <article>
        <p>#질문</p>
        <h2>{inquiryStore.inquiry.title}</h2>
        <p>
          <span>
            {inquiryStore.inquiry.publisher}
            {' '}
            |
            {' '}
            {dateFormat.fromNow(inquiryStore.inquiry.publishTime)}
          </span>
          <span>
            <button
              type="button"
              onClick={() => handleUpdateInquiry(inquiryStore.inquiry.id)}
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => handleDeleteInquiry(inquiryStore.inquiry.id)}
            >
              삭제
            </button>
          </span>
        </p>
        <button type="button" onClick={handleLectureTime}>
          {inquiryStore.inquiry.lectureTime?.minute}
          :
          {inquiryStore.inquiry.lectureTime?.second}
        </button>
        <p>{inquiryStore.inquiry.content}</p>
        <p>{inquiryStore.inquiry.hashTags}</p>
        {/* <p>🤔</p>
        <p>👏</p> */}
      </article>
      <ul>
        {commentStore.comments.map((comment) => (
          <div key={comment.id}>
            {!isUpdating ? (
              <List>
                <h3>
                  {comment.author}
                  {' '}
                  -
                  {' '}
                  {comment.publishTime}
                </h3>
                {comment.content}

                <aside>
                  <div>
                    <button type="button">좋아요</button>
                    <button type="button">댓글 작성</button>
                  </div>

                  {comment.myComment ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => handleUpdateComment(comment.id)}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    </div>
                  ) : null}
                </aside>
              </List>
            ) : (
              <CommentUpdateForm
                setIsUpdating={setIsUpdating}
                commentId={comment.id}
              />
            )}
          </div>
        ))}
      </ul>
      <CommentForm />
    </div>
  );
}
