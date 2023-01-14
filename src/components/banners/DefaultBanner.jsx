import styled from 'styled-components';

const Panel = styled.div`
  font-size: 2rem;
  font-weight: bold;

  display: flex;
  align-items: center;

  padding: 2rem 1rem;
  
  background-color: rgb(51,59,61);
  color : white;
`;

export default function DefaultBanner({ title }) {
  return (
    <Panel>
      <h2>{title}</h2>
    </Panel>
  );
}
