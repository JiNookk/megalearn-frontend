/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import baseUrl from './config';

const server = setupServer(
  rest.get(`${baseUrl}/account/my-courses`, (req, res, ctx) => res(ctx.json({
    myCourses: [{
      id: 1, title: '강의 1', imagePath: '이미지 패스', progress: 50,
    }],
  }))),

  rest.get(`${baseUrl}/courses/:courseId`, (req, res, ctx) => {
    const { courseId } = req.params;

    return res(ctx.json({
      courseId,
      recentlySeenLectureId: 135,
      category: '개발,프로그래밍 > 백엔드',
      title: '강의 1',
      stars: 5.0,
      studentCount: 1234,
      instructor: '오진성',
      hashTags: ['헛소리 잘하는법', '화나게 하는법'],
    }));
  }),

  rest.get(`${baseUrl}/courses/:courseId/unit/:lectureId`, (req, res, ctx) => {
    const { courseId, lectureId } = req.params;

    if (courseId === '1' && lectureId === '1') {
      return res(ctx.json({
        id: 1,
        title: '수업 1',
        videoUrl: '8AmBytdl7BM',
        courseId: 1,
        // 메시지, 목차, 채팅방을 어떻게 들고올까?
      }));
    }

    if (courseId === '1' && lectureId === '2') {
      return res(ctx.json({
        id: 1,
        title: '수업 2',
        videoUrl: '1klKQndsi',
        courseId: 1,
        // 메시지, 목차, 채팅방을 어떻게 들고올까?
      }));
    }

    return res(ctx.status(404));
  }),
);

export default server;
