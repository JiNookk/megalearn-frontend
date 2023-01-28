import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SkillTagStore extends Store {
  constructor() {
    super();

    this.skillTags = [];
  }

  async fetchSkillTags() {
    this.skillTags = await apiService.fetchSkillTags();

    this.publish();
  }

  async save({ skillTag }) {
    const saved = await apiService.createSkillTag({ skillTag });

    this.skillTags = [...this.skillTags, saved];

    this.publish();
  }

  async delete({ id }) {
    const deleted = await apiService.deleteSkillTag({ id });

    this.skillTags = this.skillTags
      .filter((skillTag) => skillTag.id !== deleted.id);

    this.publish();
  }
}

export const skillTagStore = new SkillTagStore();
