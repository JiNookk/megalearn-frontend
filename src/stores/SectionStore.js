import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SectionStore extends Store {
  constructor() {
    super();

    this.sections = [];
    this.modifyingSection = {};
  }

  async fetchSections({ courseId }) {
    this.sections = await apiService.fetchSections({ courseId });

    this.publish();
  }

  async save({ courseId, title, goal }) {
    const section = await apiService.createSection({ courseId, title, goal });

    this.sections = [...this.sections, section];

    this.publish();
  }

  async update({
    title, goal, sectionId,
  }) {
    const updated = await apiService.updateSection({
      title, goal, sectionId,
    });

    this.sections = this.sections
      .map((section) => (section.id === sectionId ? updated : section));

    this.publish();
  }

  async delete({ sectionId }) {
    const deleted = await apiService.deleteSection({ sectionId });

    this.sections = this.sections
      .filter((section) => (section.id !== deleted.id));

    this.publish();
  }

  setModifyingSection(section) {
    this.modifyingSection = section;

    this.publish();
  }

  completeModify() {
    this.modifyingSection = {};

    this.publish();
  }
}

export const sectionStore = new SectionStore();
