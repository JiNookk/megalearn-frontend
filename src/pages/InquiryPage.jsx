import styled from 'styled-components';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Image from '../components/ui/Image';
import SubTitle from '../components/ui/SubTitle';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import useInquiryStore from '../hooks/useInquiryStore';
import { dateFormat } from '../utils/DateFormat';
import useCommentStore from '../hooks/useCommentStore';
import InlineBlock from '../components/ui/InlineBlock';
import useCommentFormStore from '../hooks/useCommentFormStore';
import TextEditor from '../utils/TextEditor';
import Padding from '../components/ui/Padding';
import useAccountStore from '../hooks/useAccountStore';
import SecondaryButton from '../components/ui/SecondaryButton';

const Container = styled.div`
  position: relative;
  padding-block: 2rem;
`;

const Header = styled.div`
  border-block-end: 1px solid #e8ecef;
  padding-block: 1rem;
`;

const Logo = styled.span`
  font-size: 2.5rem;
  margin-right: .5rem;
  color: #75E6C7;
`;

const List = styled.ul`
  display : flex;
  align-items: center;
  color: #8d959c;

  li{
    margin-inline: 1rem;
  }

  button{
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding-block: 2rem;
  white-space: pre-wrap;
`;

const Reply = styled.div`
  padding-block: 2rem;
  margin-top: 9rem;
  background: #F8F9FA;
`;

const ReplyForm = styled.form`
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
    border: none;
    background: none;
`;

const ButtonsWrapper = styled.div`
  button{
    padding: .75rem 2rem;
    margin-left: .5rem;
  }  
`;

const Mint = styled.strong`
  color: #75E6C7;
`;

const Replys = styled.ul`
  li{
    border: 1px solid #e8ecef; 
    border-radius: 6px;
    padding: 2rem;
    background: white;

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
  position: absolute;
  top: 10%; 
  right: 5%;
  /* transform: translate(-50%, -50%); */
  padding: .8rem 1.5rem;
  /* text-align: center; */
  /* z-index: 999; */
`;

export default function InquiryPage() {
  const inquiryId = window.location.pathname.split('/')[2];

  const [editorOn, setEditorOn] = useState(false);
  const inquiryStore = useInquiryStore();
  const commentStore = useCommentStore();
  const commentFormStore = useCommentFormStore();
  const accountStore = useAccountStore();

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

    setEditorOn(!editorOn);
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
      <SolveButton type="button" onClick={handleToggleSolved}>
        {inquiryStore.inquiry.status?.solved === 'processing' ? '미해결' : '해결'}
      </SolveButton>
      <Padding>
        <Header>
          <Title>
            <Logo>
              Q
            </Logo>
            {' '}
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
                {moment(inquiryStore.inquiry.publishTime).format('YY.MM.DD hh:mm')}
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
      </Padding>
      <Padding>
        <Content>
          {inquiryStore.inquiry.content}
        </Content>
      </Padding>
      <Reply>
        <Padding>
          <SubTitle>
            답변
            {' '}
            <Mint>
              {commentStore.comments.length}
            </Mint>
          </SubTitle>
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
        </Padding>
      </Reply>
    </Container>
  );
}
