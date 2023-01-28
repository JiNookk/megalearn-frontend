import moment from 'moment';
import { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class WeeklyBarChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  render() {
    const { payments } = this.props;

    const dates = [-6, -5, -4, -3, -2, -1, 0]
      .map((number) => moment().add(number, 'd').format('YY-MM-DD'));

    // { name : 2023/01/13, itemname1: 3500, itemname2: 2200, }
    // 우리가 필요한 것 : 강의 이름과 가격

    // const paymentData = dates.reduce((acc, date) => ([
    //   ...acc,

    // ]),[]);

    // const paymentData = payments
    // .reduce((acc, payment) => ({
    //   ...acc,
    //   (dates[3] === moment(payment.createdAt).format('YY-MM-DD'))
    //   ? [payment.courseTitle]: payment.cost
    //   :
    // }),{name: dates[3]})

    // console.log(payments);
    // console.log(dates);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
