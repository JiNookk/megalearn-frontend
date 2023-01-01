import useCommentStore from '../../hooks/useCommentStore';
import useCommentUpdateFormStore from '../../hooks/useCommentUpdateFormStore';

export default function CommentUpdateForm({ setIsUpdating, commentId }) {
  const commentUpdateFormStore = useCommentUpdateFormStore();
  const commentStore = useCommentStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentUpdateFormStore.content) {
      const { content } = commentUpdateFormStore;

      commentStore.updateComment({ commentId, content });

      commentUpdateFormStore.reset();

      setIsUpdating(false);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label hidden htmlFor="input-content">댓글 수정란</label>
      <input
        id="input-content"
        type="text"
        placeholder="수정할 내용을 입력하세요"
        value={commentUpdateFormStore.content}
        onChange={(e) => commentUpdateFormStore.changeContent(e.target.value)}
      />
      <button type="submit" onClick={handleCancelUpdate}>취소</button>
      <button type="submit">수정하기</button>
    </form>
  );
}
