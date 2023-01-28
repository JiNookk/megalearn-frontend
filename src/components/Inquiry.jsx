import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAccountStore from '../hooks/useAccountStore';
import useCommentFormStore from '../hooks/useCommentFormStore';
import useCommentStore from '../hooks/useCommentStore';
import useInquiryStore from '../hooks/useInquiryStore';
import { dateFormat } from '../utils/DateFormat';
import getQueryParam from '../utils/getQueryParam';
import TextEditor from '../utils/TextEditor';
import CommentUpdateForm from './forms/CommentUpdateForm';
import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';
import SubTitle from './ui/SubTitle';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    overflow-y: scroll;
    
    >div{
      padding: 1.5rem;
    }

    >div:first-child{
      border-bottom: 1px solid #D9D9D9;
    }
`;

const Button = styled.button`
      background: none;
      padding-inline: 1rem;
      height: 2.5rem;
      border: 1px solid #eaedf0;
      border-radius: 1rem;
      margin-inline: .5rem;
`;

const CommentsWrapper = styled.div`
  flex: 1;
`;

const List = styled.ul`
  flex: 1;

  li{
    margin-block:2rem;
    
    p{
      font-size: 1.1rem;
    }
  }

  h3{
    font-size: .9rem;
    margin-block: 1rem;
  }


  aside{
    display: flex;
    
    button{
      border: none;
      padding-inline: 0;
      margin-inline: 0 1rem;
      color: #c3c6c9;
    }
  }
`;

const InquiryInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f8f9fa;
  color: #989c9f;
`;

const Content = styled.div`
  padding-top: 1rem;
  white-space: pre-wrap;

  div{
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
`;

const Time = styled.span`
  color: #c3c6c9;
`;

const ReplyForm = styled.form`
  position: sticky;
  bottom: 0%;
  margin-block: 2rem;
  text-align: end;

  label{
    display: block;
  }
  
  img{
    display: block;
    width: 40px;
    height: 40px;
  }

  input{
    display: block;
    width: 100%;
    height: 40px;
    padding-inline: 1rem;
    margin-left: 1rem;
    border: 1px solid #D3DADD;
    border-radius: 4px;
  }
`;

const InputWrapper = styled.button`
    display: flex;
    width: 100%;
    background: none;
    border: none;
`;

const ButtonsWrapper = styled.div`
  button{
    padding: .75rem 2rem;
    margin-left: .5rem;
  }  
`;

const Buttons = styled.div`
  text-align: end;
`;

export default function Inquiry({ onNavigate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [editorOn, setEditorOn] = useState(false);

  const courseId = window.location.pathname.split('/')[2];
  const lectureId = window.location.pathname.split('/')[4];
  const inquiryId = getQueryParam({ category: 'inquiryId' });

  const accountStore = useAccountStore();
  const commentStore = useCommentStore();
  const commentFormStore = useCommentFormStore();
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

  const handleToggleLike = () => {

  };

  const handleSubmitReply = (event) => {
    event.preventDefault();

    const comment = {
      inquiryId,
      content: commentFormStore.content,
    };

    commentStore.post(comment);

    commentFormStore.reset();

    setEditorOn(!editorOn);
  };

  useEffect(() => {
    inquiryStore.fetchInquiry({ inquiryId });
    commentStore.fetchComments({ inquiryId });
  }, []);

  return (
    <Container>
      <div>
        <p>질문</p>
        <SubTitle>
          <small>
            {inquiryStore.inquiry.title}
          </small>
        </SubTitle>
        <InquiryInformation>
          <span>
            {inquiryStore.inquiry.publisher}
            {' '}
            |
            {' '}
            {dateFormat.fromNow(inquiryStore.inquiry.publishTime)}
          </span>
          <span>
            <Button
              type="button"
              onClick={() => handleUpdateInquiry(inquiryStore.inquiry.id)}
            >
              수정
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteInquiry(inquiryStore.inquiry.id)}
            >
              삭제
            </Button>
          </span>
        </InquiryInformation>
        <Content>
          <p>{inquiryStore.inquiry.content}</p>
          <p>{inquiryStore.inquiry.hashTags}</p>
        </Content>
      </div>
      <CommentsWrapper>
        <SubTitle>
          답변
          {' '}
          {commentStore.comments.length}
        </SubTitle>
        <List>
          {commentStore.comments.map((comment) => (
            <div key={comment.id}>
              {!isUpdating ? (
                <li>
                  <h3>
                    {' '}
                    <strong>
                      {comment.author}
                    </strong>
                    {' '}
                    <Time>
                      {moment(comment.publishTime).format('YYYY.MM.DD a h:mm  ')}
                    </Time>
                  </h3>
                  <p>
                    {comment.content}
                  </p>
                  <Buttons>
                    {comment.myComment ? (
                      <div>
                        <Button
                          type="button"
                          onClick={() => handleUpdateComment(comment.id)}
                        >
                          수정
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    ) : null}
                  </Buttons>
                </li>
              ) : (
                <CommentUpdateForm
                  setIsUpdating={setIsUpdating}
                  commentId={comment.id}
                />
              )}
            </div>
          ))}
        </List>
      </CommentsWrapper>
      <ReplyForm onSubmit={handleSubmitReply}>
        {editorOn ? (
          <div>
            <InputWrapper type="button">
              <TextEditor type="comment" height={200} />
            </InputWrapper>
            <ButtonsWrapper>
              <PrimaryButton type="button" onClick={() => setEditorOn(!editorOn)}>
                취소
              </PrimaryButton>
              <SecondaryButton type="submit">
                등록
              </SecondaryButton>
            </ButtonsWrapper>
          </div>
        ) : (
          <InputWrapper type="button" onClick={() => setEditorOn(!editorOn)}>
            <label htmlFor="input-comment">
              <img src="/assets/images/default-profile.png" alt="profile" />
            </label>
            <input
              placeholder={`${accountStore.name}님, 답변을 작성해보세요`}
              type="text"
              id="input-comment"
            />
          </InputWrapper>
        )}
      </ReplyForm>
    </Container>
  );
}
