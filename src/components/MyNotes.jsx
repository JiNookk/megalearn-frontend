import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseStore from '../hooks/useCourseStore';
import useLectureStore from '../hooks/useLectureStore';
import useNoteStore from '../hooks/useNoteStore';
import SubTitle from './ui/SubTitle';

const Image = styled.img`
  width: 10em;
  height: 6em;
`;

const Notes = styled.ul`
  width: 100%;
  
  a{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-block-end: 1px solid #e8ecef;
    padding : 1rem;

    div:last-child{
      display: flex;
      align-items: center;
      
      p{
        font-size: 2rem;
      }
    }
  }
`;

export default function MyNotes() {
  const courseStore = useCourseStore();
  const noteStore = useNoteStore();
  const lectureStore = useLectureStore();

  useEffect(() => {
    courseStore.fetchMyCourses();
    noteStore.fetchMyNotes();
    lectureStore.fetchMyLectures();
  }, []);

  return (
    <Notes>
      <hr />
      <ul>
        {courseStore.courses
          .map((course) => (
            <li key={course.id}>
              <Link to={`/mynote?courseId=${course.id}`}>
                <div>
                  <SubTitle>
                    {course.title}
                  </SubTitle>
                  <p>
                    {/* 강의 id -> 수업 id -> 노트 id 찾기 */}
                    노트수
                    {' '}
                    {noteStore.notes
                      .filter((note) => (
                        lectureStore.lectures
                          .filter((lecture) => (lecture.courseId === course.id))
                          .map((lecture) => lecture.id)
                          .reduce((acc, currentId) => acc || currentId === note.lectureId, false)
                      )).length}
                    {' '}
                    | 최근 학습일: 2023. 01. 09
                  </p>
                </div>
                <div>
                  <Image src="/assets/images/test.jpg" alt="course-thumbnail" />
                  <p>{'>'}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </Notes>
  );
}
