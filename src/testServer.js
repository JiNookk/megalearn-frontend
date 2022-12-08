/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:8000/account/my-courses', (req, res, ctx) => res(ctx.json({
    myCourses: [{
      id: 1, title: '강의 1', imagePath: '이미지 패스', progress: 50,
    }],
  }))),

  rest.get('http://localhost:8000/courses/:courseId', (req, res, ctx) => {
    const { productId } = req.params;

    return res(ctx.json({
      courseId: productId,
      recentlySeenLectureId: 135,
      category: '개발,프로그래밍 > 백엔드',
      title: '강의 1',
      stars: 5.0,
      studentCount: 1234,
      instructor: '오진성',
      hashTags: ['헛소리 잘하는법', '화나게 하는법'],
    }));
  }),
);

export default server;
