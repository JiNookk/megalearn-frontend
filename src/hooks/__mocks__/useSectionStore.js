export default function useSectionStore() {
  return {
    fetchSections: jest.fn(),
    sections: [{
      id: 1,
    }, {
      id: 2,
    }],
  };
}
