import React from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';
import githubLangColors from './github-lang-colors.json';
import numberFormat from './numberFormat';
import percentageFormat from './percentageFormat';
import * as PieCharts from './style';

Chart.defaultProps = {
  ratioArray: [
    { name: 'JavaScript', value: 44.53 },
    { name: 'HTML', value: 35.57 },
    { name: 'CSS', value: 13.27 },
    { name: 'TypeScript', value: 6.64 },
  ],
};

export default function Chart({ ratioArray, cost }) {
  const langColor = githubLangColors;
  const COLORS = ratioArray.map((it) => {
    const langName = it.name;
    return langColor[langName];
  });

  return (
    <PieCharts.Container>
      <PieCharts.Wrapper>
        <PieCharts.Heading>
          <PieCharts.Title>
            {numberFormat(cost) }
            원
          </PieCharts.Title>
        </PieCharts.Heading>
        <PieCharts.RatioWrapper>
          {ratioArray
            && ratioArray.map((it, idx) => (
              <PieCharts.LangColorBoxWrapper key={`${it.name}-${it.value}`}>
                <PieCharts.LangColorBox idx={COLORS[idx]} />
                <div>
                  <PieCharts.LangText>
                    {percentageFormat(it.value / cost)}
                    %
                  </PieCharts.LangText>
                  <PieCharts.LangText>{it.name}</PieCharts.LangText>
                </div>
              </PieCharts.LangColorBoxWrapper>
            ))}
        </PieCharts.RatioWrapper>
      </PieCharts.Wrapper>

      <PieCharts.PieWrapper>
        <PieChart width={200} height={200}>
          <Pie
            data={ratioArray}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
          >
            {ratioArray.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </PieCharts.PieWrapper>
    </PieCharts.Container>
  );
}
