export default function useCourseStore() {
  return {
    submitCourse: jest.fn(),
    fetchCourse: jest.fn(),
    course: {
      id: 1,
      title: 'title',
      category: 'category',
      description: '',
      coverImage: 'imagePath',
      price: 100000,
    },
  };
}
