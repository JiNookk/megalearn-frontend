import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class CourseFormStore extends Store {
  constructor() {
    super();

    this.title = '';
    this.category = '';
    this.description = '';
    this.price = 0;
    this.thumbnail = '';
    this.level = '';
    this.skills = new Set();
    this.error = { message: '' };
  }

  changeTitle(title) {
    this.title = title;

    this.publish();
  }

  changeCategory(category) {
    this.category = category;

    this.publish();
  }

  changeDescription(description) {
    this.description = description;

    this.publish();
  }

  changeThumbnail(thumbnail) {
    this.thumbnail = thumbnail;

    this.publish();
  }

  async changeThumbnailPath(file) {
    const thumbnail = await apiService.upload(file);

    this.changeThumbnail(thumbnail);

    this.publish();
  }

  changePrice(price) {
    this.price = price;

    this.publish();
  }

  changeLevel(level) {
    this.level = level;

    this.publish();
  }

  changeSkill(skill) {
    if (this.skills.has(skill)) {
      this.skills.delete(skill);

      this.publish();
      return;
    }

    this.skills.add(skill);

    this.publish();
  }

  setSkill(skillSets) {
    this.skills = new Set(skillSets);

    this.publish();
  }

  validateTitle() {
    this.error.message = this.title.length < 5 ? '5자 이상 작성해주세요.' : '';

    this.publish();
  }

  validatePrice() {
    if (this.price <= 0) {
      this.price = 0;
      return;
    }

    if (this.price > 0 && this.price < 10000) {
      this.price = 10000;
      return;
    }

    this.publish();
  }

  reset() {
    this.title = '';
    this.category = '';
    this.description = '';
    this.thumbnail = '';
    this.price = 0;
    this.level = '';
    this.skills = new Set();

    this.publish();
  }
}

export const courseFormStore = new CourseFormStore();
