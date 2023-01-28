import styled from 'styled-components';
import Padding from '../ui/Padding';

const Panel = styled.div`
  font-size: 2rem;
  font-weight: bold;

  display: flex;
  align-items: center;

  padding: 2rem 0;
  
  background-color: rgb(51,59,61);
  color : white;
`;

export default function DefaultBanner({ title }) {
  return (
    <Panel>
      <Padding>
        <h2>{title}</h2>
      </Padding>
    </Panel>
  );
}
