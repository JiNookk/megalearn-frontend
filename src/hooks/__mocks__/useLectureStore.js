export default function useLectureStore() {
  return {
    fetchLectures: jest.fn(),
    lections: [{
      id: 1,
    }, {
      id: 2,
    }],
  };
}
