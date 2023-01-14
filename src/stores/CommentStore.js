import { apiService } from '../services/ApiService';
import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = [];
  }

  async post({ inquiryId, content }) {
    const comment = await apiService.createComment({ inquiryId, content });

    this.comments = [...this.comments, comment];

    this.publish();
  }

  async fetchComments({ inquiryId }) {
    this.comments = await apiService.fetchComments({ inquiryId });

    this.publish();
  }

  async updateComment({ commentId, content }) {
    const updated = await apiService.updateComment({ commentId, content });

    // this.comments = [...this.comments].filter((c) => c.id !== commentId);
    this.comments = [...this.comments, updated];

    this.publish();
  }

  async deleteComment({ commentId }) {
    const { commentId: id } = await apiService.deleteComment({ commentId });

    this.comments = [...this.comments].filter((comment) => comment.id !== id);

    this.publish();
  }
}

export const commentStore = new CommentStore();
