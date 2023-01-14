export default function useSectionStore() {
  return {
    fetchSectionsByCourseId: jest.fn(),
    sections: [{
      id: 1,
    }, {
      id: 2,
    }],
  };
}
