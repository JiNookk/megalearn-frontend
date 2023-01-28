import { PureComponent } from 'react';
import {
  PieChart, Pie,
} from 'recharts';
import styled from 'styled-components';
import HoverMessage from '../components/HoverMessage';

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

export default class WeeklyChart extends PureComponent {
  render() {
    const {
      hover, setHover, lectureCount, lectureTime, noteCount, id, date,
    } = this.props;

    const data01 = [
      { name: 'Group A', value: lectureCount < 1 ? 0 : 1, fill: '#da77f1' },
      { name: 'blank', value: lectureCount < 2 ? 1 : 0, fill: '#FFFFFF' },
    ];

    const data02 = [
      { name: 'Group A', value: lectureTime < 1 ? 0 : 1, fill: '#738ffc' },
      { name: 'blank', value: lectureTime < 3600 ? 1 : 0, fill: '#FFFFFF' },
    ];

    const data03 = [
      { name: 'Group A', value: noteCount < 1 ? 0 : 1, fill: '#3ac9db' },
      { name: 'blank', value: noteCount < 2 ? 1 : 0, fill: '#FFFFFF' },
    ];

    const data04 = [
      { name: 'Group A', value: 1 },
      { name: 'blank', value: 0 },
    ];

    return (
      <Container
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(0)}
      >
        <PieChart
          width={40}
          height={40}
        >
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={5} fill="#FFFFFF" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={5} outerRadius={10} fill="#FFFFFF" />
          <Pie data={data03} dataKey="value" cx="50%" cy="50%" innerRadius={10} outerRadius={15} fill="#FFFFFF" />
          <Pie data={data04} dataKey="value" cx="50%" cy="50%" innerRadius={15} outerRadius={17} fill="#f0f0f0" />
        </PieChart>
        <HoverMessage
          date={date}
          hover={hover}
          setHover={setHover}
          id={id}
          lectureCount={lectureCount}
          lectureTime={lectureTime}
          noteCount={noteCount}
        />
      </Container>
    );
  }
}
