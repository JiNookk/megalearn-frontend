import useCommentFormStore from '../../hooks/useCommentFormStore';
import useCommentStore from '../../hooks/useCommentStore';
import getQueryParam from '../../utils/getQueryParam';
import TextEditor from '../../utils/TextEditor';

export default function CommentForm() {
  const inquiryId = getQueryParam({ category: 'inquiryId' });

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
      <TextEditor height={200} type="comment" />
      <button type="submit">댓글 입력</button>
    </form>
  );
}
