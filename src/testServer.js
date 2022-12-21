/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
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

    if (courseId === '1') {
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
    }

    return res(ctx.status(404));
  }),

  rest.get(`${baseUrl}/courses/:courseId/unit`, (req, res, ctx) => {
    const { courseId } = req.params;

    if (courseId === '1') {
      return res(ctx.json({
        lectures: [{
          id: 1,
          title: '테스트 1강',
          videoUrl: '8AmBytdl7BM',
          courseId: 1,
        // 메시지, 목차, 채팅방을 어떻게 들고올까?
        }, {
          id: 2,
          title: '테스트 2강',
          videoUrl: '1klKQndsi',
          courseId: 1,
        // 메시지, 목차, 채팅방을 어떻게 들고올까?
        }],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.get(`${baseUrl}/courses/:courseId/unit/:lectureId`, (req, res, ctx) => {
    const { courseId, lectureId } = req.params;

    if (courseId === '1' && lectureId === '1') {
      return res(ctx.json({
        id: 1,
        title: '테스트 1강',
        videoUrl: '8AmBytdl7BM',
        courseId: 1,
        // 목차, 채팅방을 어떻게 들고올까?
      }));
    }

    if (courseId === '1' && lectureId === '2') {
      return res(ctx.json({
        id: 2,
        title: '테스트 2강',
        videoUrl: 'eeiLCzJmKro',
        courseId: 1,
      }));
    }

    return res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/comments`, async (req, res, ctx) => {
    const { author, content } = await req.json();

    return res(ctx.json({
      author, content, id: 1, time: Date(),
    }));
  }),

  rest.patch(`${baseUrl}/comments/:commentId`, async (req, res, ctx) => {
    const { content } = await req.json();

    const { commentId } = req.params;

    return res(ctx.json({
      author: 'tester', content, id: +commentId, time: Date(),
    }));
  }),

  rest.delete(`${baseUrl}/comments/:commentId`, async (req, res, ctx) => {
    const { commentId } = req.params;

    return res(ctx.json({ commentId: +commentId }));
  }),

  rest.get(`${baseUrl}/inquiries/:inquiryId/comments`, (req, res, ctx) => {
    const { inquiryId } = req.params;

    if (inquiryId === '1') {
      return res(ctx.json({
        comments: [{
          id: 1,
          author: 'tester2',
          publishTime: moment(),
          content: '저도 궁금해요~',
        }],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.get(`${baseUrl}/inquiries/:inquiryId`, (req, res, ctx) => {
    const { inquiryId } = req.params;

    if (inquiryId === '1') {
      return res(ctx.json({
        publisher: 'tester',
        publishTime: moment(),
        hashTags: ['#JPA'],
        content: '강의에서 사용하는 의존성 정보가 궁금합니다~',
        lectureTime: { minute: 1, second: 24 },
        emoticons: ['🤔', '👏'],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.get(`${baseUrl}/lectures/:lectureId/inquiries`, (req, res, ctx) => {
    const { lectureId } = req.params;

    if (lectureId === '1') {
      return res(ctx.json({
        inquiries: [{
          title: 'title',
          publisher: 'tester',
          hashTag: 'hashTag',
          content: 'JPA',
          anonymous: true,
          id: 1,
          time: Date(),
          lectureTime: { minute: 1, second: 24 },
        }],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/inquiries`, (req, res, ctx) => {
    const {
      publisher, hashTag, content, anonymous, minute, second,
    } = req.json;

    return res(ctx.json({
      publisher, hashTag, content, anonymous, minute, second, id: 1, time: Date(),
    }));
  }),

  rest.patch(`${baseUrl}/inquiries/:inquiryId`, async (req, res, ctx) => {
    const { inquiryId } = req.params;
    const {
      title, hashTags, content, minute, second,
    } = await req.json();

    return res(ctx.json({
      inquiryId, title, hashTags, content, minute, second,
    }));
  }),

  rest.delete(`${baseUrl}/inquiries/:inquiryId`, async (req, res, ctx) => {
    const { inquiryId } = req.params;

    return res(ctx.json({ inquiryId: +inquiryId }));
  }),

  rest.post(`${baseUrl}/notes`, (req, res, ctx) => {
    const {
      content, lectureTime, lectureId,
    } = req.json;

    return res(ctx.json({
      content,
      lectureTime,
      lectureId,
      id: 1,
    }));
  }),

  rest.get(`${baseUrl}/lectures/:lectureId/notes`, (req, res, ctx) => {
    const { lectureId } = req.params;

    if (+lectureId === 1) {
      return res(ctx.json({
        notes: [{
          content: 'content',
          lectureTime: { minute: 1, second: 24 },
          lectureId: 1,
          id: 1,
        }, {
          content: 'content2',
          lectureTime: { minute: 2, second: 24 },
          lectureId: 1,
          id: 2,
        }],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.patch(`${baseUrl}/notes/:noteId`, async (req, res, ctx) => {
    const { noteId } = req.params;
    const { content } = await req.json();

    return res(ctx.json({
      content,
      lectureTime: { minute: 1, second: 24 },
      lectureId: 1,
      id: noteId,
    }));
  }),

  rest.delete(`${baseUrl}/notes/:noteId`, async (req, res, ctx) => {
    const { noteId } = req.params;

    return res(ctx.json({ noteId: +noteId }));
  }),

  rest.get(`${baseUrl}/courses/:courseId/sections`, (req, res, ctx) => {
    const { courseId } = req.params;

    if (+courseId === 1) {
      return res(ctx.json({
        sections: [{
          id: 1,
          title: '섹션 1',
          progresses: [{
            id: 1,
            title: '테스트 1강',
          }, {
            id: 2,
            title: '테스트 2강',
          }],
        }, {
          id: 2,
          title: '섹션 2',
          progresses: [{
            id: 3,
            title: '테스트 3강',
          }],
        }],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.get(`${baseUrl}/courses/:courseId/progresses`, (req, res, ctx) => {
    const { courseId } = req.params;

    if (+courseId === 1) {
      return res(ctx.json({
        progresses: [{
          id: 1,
          title: '테스트 1강',
          status: 'unwatched',
        }, {
          id: 2,
          title: '테스트 2강',
          status: 'completed',
        }, {
          id: 3,
          title: '테스트 3강',
          status: 'unwatched',
        }],
      }));
    }

    return res(ctx.status(404));
  }),

  rest.get(`${baseUrl}/lectures/:lectureId/progress`, (req, res, ctx) => {
    const { lectureId } = req.params;

    if (+lectureId === 1) {
      return res(ctx.json({
        id: 1,
        title: '테스트 1강',
        status: 'unwatched',
      }));
    }

    return res(ctx.status(404));
  }),

  rest.patch(`${baseUrl}/progresses/:progressId`, (req, res, ctx) => {
    const { progressId } = req.params;

    if (+progressId === 1) {
      return res(ctx.json({
        id: 1,
        title: '테스트 1강',
        status: 'completed',
      }));
    }

    return res(ctx.status(404));
  }),

);

export default server;
