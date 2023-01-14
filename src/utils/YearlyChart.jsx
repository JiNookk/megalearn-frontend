import moment from 'moment';
import GitHubCalendar from 'react-github-contribution-calendar';

export default function YearlyChart({ progresses }) {
  const values = progresses
    .map((progress) => moment(progress.completedAt).format('YYYY-MM-DD'))
    .reduce((acc, completedAt) => ({
      ...acc,
      [completedAt]: acc[completedAt] ? acc[completedAt] + 1 : 1,
    }), {});

  const until = '2023-12-31';

  return (
    <div>
      <GitHubCalendar values={values} until={until} />
    </div>
  );
}
