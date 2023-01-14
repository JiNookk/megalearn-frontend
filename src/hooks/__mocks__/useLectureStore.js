export default function useLectureStore() {
  return {
    fetchLecturesByCourseId: jest.fn(),
    lections: [{
      id: 1,
    }, {
      id: 2,
    }],
  };
}
