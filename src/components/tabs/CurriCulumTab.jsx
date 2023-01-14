/* eslint-disable no-unsafe-optional-chaining */
import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCourseStore from '../../hooks/useCourseStore';
import useProgressStore from '../../hooks/useProgressStore';
import useSectionStore from '../../hooks/useSectionStore';
import percentageFormat from '../../utils/percentageFormat';

export default function CurriCulumTab({ onTabOff }) {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { courseId } = state;

  const sectionStore = useSectionStore();
  const courseStore = useCourseStore();
  const progressStore = useProgressStore();

  useEffect(() => {
    sectionStore.fetchSectionsByCourseId({ courseId });
  }, []);

  const handleNavigate = (lectureId) => {
    onTabOff(false);
    navigate(`/courses/${courseId}/lectures/${lectureId}`, {
      state: { courseId, lectureId },
    });
  };

  return (
    <article>
      <h2>목차</h2>
      <h3>{courseStore.course.title}</h3>
      <p>
        진도율:
        {' '}
        {progressStore.progresses
          .filter((progress) => progress.status === 'completed').length}
        /
        {progressStore.progresses.length}
        강(
        {percentageFormat(progressStore.progresses
          .filter((progress) => progress.status === 'completed').length
        / progressStore.progresses.length)}
        %
        ) | 시간:
        {' '}
        {progressStore.progresses
          .filter((progress) => progress.status === 'completed')
          .reduce((acc, cur) => (acc + cur?.lectureTime.minute), 0)}
        분/
        {progressStore.progresses
          .reduce((acc, cur) => (acc + cur?.lectureTime.minute), 0)}
        분
      </p>

      <table>
        {sectionStore.sections.map((section) => (
          <Fragment key={section.id}>
            <thead>
              <tr>
                <th>{section.title}</th>
              </tr>
            </thead>
            <tbody>
              {section.progresses.map((progress) => (
                <tr key={progress.id} onClick={() => handleNavigate(progress.lectureId)}>
                  <td>
                    {progress.status === 'completed' ? '✅' : '❎' }
                    {' '}
                    {progress.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </Fragment>
        ))}
      </table>
    </article>
  );
}
