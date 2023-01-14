import styled from 'styled-components';
import { useEffect } from 'react';
import Image from '../components/ui/Image';
import SubTitle from '../components/ui/SubTitle';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import useInquiryStore from '../hooks/useInquiryStore';
import { dateFormat } from '../utils/DateFormat';
import useCommentStore from '../hooks/useCommentStore';
import InlineBlock from '../components/ui/InlineBlock';
import useCommentFormStore from '../hooks/useCommentFormStore';

const Container = styled.div`
  padding: 2rem 15rem;
`;

const Header = styled.div`
  border-block-end: 1px solid #e8ecef;
  padding-block: 1rem;
`;

const List = styled.ul`
  display : flex;
  align-items: center;
  color: #8d959c;

  button{
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding-block: 2rem;
`;

const Reply = styled.div`
  border-block-start: 1px solid #f1f3f5; 
  padding-block: 2rem;
`;

const ReplyForm = styled.form`
  margin-block: 2rem;
`;

const Replys = styled.ul`
  li{
    border: 1px solid #e8ecef; 
    border-radius: 6px;
    padding: 2rem;

    > div:last-child{
      padding-block-start: 2rem;
    }
  }
`;

const ReplyHeader = styled.div`
  display: flex;
  align-content: center;
  padding-block-end: 1.5rem;
  border-block-end: 1px solid #e8ecef;

  img{
    margin-inline: 0 1rem;
  }
`;

const SolveButton = styled(PrimaryButton)`
  z-index: 999;
  
  position: fixed;
  top: 6rem;
  right: 3rem;
  transform: translate(-50%, -50%);

  padding: .8rem 1.5rem;

  text-align: center;
`;

export default function InquiryPage() {
  const inquiryId = window.location.pathname.split('/')[2];

  const inquiryStore = useInquiryStore();
  const commentStore = useCommentStore();
  const commentFormStore = useCommentFormStore();

  const handleUpdateInquiry = () => {

  };

  const handleDeleteInquiry = () => {
    inquiryStore.deleteInquiry({ inquiryId });
  };

  const handleSubmitReply = (event) => {
    event.preventDefault();

    const comment = {
      inquiryId,
      content: commentFormStore.content,
    };

    commentStore.post(comment);

    commentFormStore.reset();
  };

  const handleToggleSolved = () => {
    inquiryStore.toggleSolved({ inquiryId });
  };

  useEffect(() => {
    inquiryStore.increaseHits({ inquiryId });
    commentStore.fetchComments({ inquiryId });
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          {inquiryStore.inquiry.title}
        </Title>
        <SubTitle>
          {inquiryStore.inquiry.publisher}
        </SubTitle>
        <InlineBlock>
          <List>
            <li>
              작성일
              {' '}
              {dateFormat.defaultFormat(inquiryStore.inquiry.publishTime)}
            </li>
            <li>
              조회수
              {' '}
              {inquiryStore.inquiry.hits}
            </li>
          </List>
          <List>
            <li>
              <button type="button" onClick={handleUpdateInquiry}>
                수정
              </button>
            </li>
            <li>
              <button type="button" onClick={handleDeleteInquiry}>
                삭제
              </button>
            </li>
          </List>
        </InlineBlock>
      </Header>
      <Content>
        {inquiryStore.inquiry.content}
      </Content>
      <Reply>
        <SubTitle>
          답변
          {' '}
          {commentStore.comments.length}
        </SubTitle>
        <ReplyForm onSubmit={handleSubmitReply}>
          <label htmlFor="input-reply">답변</label>
          <input
            placeholder="답변을 작성해보세요."
            name="reply"
            id="input-reply"
            type="text"
            value={commentFormStore.content}
            onChange={(e) => commentFormStore.changeContent(e.target.value)}
          />
        </ReplyForm>
        <Replys>
          {commentStore.comments.map((comment) => (
            <li key={comment.id}>
              <ReplyHeader>
                <Image src="/assets/images/test.jpg" alt="thumbnail" />
                <div>
                  <h4>
                    {comment.author}
                  </h4>
                  <p>
                    {dateFormat.defaultFormat(comment.publishTime)}
                  </p>
                </div>
              </ReplyHeader>
              <div>
                {comment.content}
              </div>
            </li>
          ))}
        </Replys>
      </Reply>
      <SolveButton type="button" onClick={handleToggleSolved}>
        {inquiryStore.inquiry.status?.solved === 'processing' ? '미해결' : '해결'}
      </SolveButton>
    </Container>
  );
}
