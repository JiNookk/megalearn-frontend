import LectureModifyingFormStore from './LectureModifyingFormStore';

describe('LectureModifyingFormStore', () => {
  let lectureModifyingFormStore;

  beforeEach(() => {
    lectureModifyingFormStore = new LectureModifyingFormStore();
  });

  describe('changeTitle', () => {
    it('changes title', () => {
      lectureModifyingFormStore.changeTitle('hi');

      expect(lectureModifyingFormStore.title).toBe('hi');
    });
  });

  describe('changeVideoUrl', () => {
    it('changes videoUrl', () => {
      lectureModifyingFormStore.changeVideoUrl('hi');

      expect(lectureModifyingFormStore.videoUrl).toBe('hi');
    });
  });

  describe('changeLectureNote', () => {
    it('changes lectureNote', () => {
      lectureModifyingFormStore.changeLectureNote('hi');

      expect(lectureModifyingFormStore.lectureNote).toBe('hi');
    });
  });

  describe('changeFilePath', () => {
    it('changes filePath', () => {
      lectureModifyingFormStore.changeFilePath('hi');

      expect(lectureModifyingFormStore.filePath).toBe('hi');
    });
  });

  describe('reset', () => {
    it('resets message', () => {
      lectureModifyingFormStore.changeTitle('hi');
      lectureModifyingFormStore.changeVideoUrl('hi');
      lectureModifyingFormStore.changeLectureNote('hi');
      lectureModifyingFormStore.changeFilePath('hi');
      lectureModifyingFormStore.reset();

      expect(lectureModifyingFormStore.title).toBe('');
      expect(lectureModifyingFormStore.videoUrl).toBe('');
      expect(lectureModifyingFormStore.lectureNote).toBe('');
      expect(lectureModifyingFormStore.filePath).toBe('');
    });
  });
});
