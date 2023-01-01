import { useLocation } from 'react-router-dom';
import useCommentFormStore from '../../hooks/useCommentFormStore';
import useCommentStore from '../../hooks/useCommentStore';

export default function CommentForm() {
  const { state } = useLocation();
  const { inquiryId } = state;

  const commentFormStore = useCommentFormStore();
  const commentStore = useCommentStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentFormStore.content) {
      const content = {
        inquiryId,
        content: commentFormStore.content,
      };

      commentStore.post(content);

      commentFormStore.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label hidden htmlFor="input-content">댓글 입력란</label>
      <input
        id="input-content"
        type="text"
        placeholder="답변을 입력해주세요"
        value={commentFormStore.content}
        onChange={(e) => commentFormStore.changeContent(e.target.value)}
      />
      <button type="submit">댓글 입력</button>
    </form>
  );
}
