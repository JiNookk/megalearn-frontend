import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  font-size: 1em;
  
  h2{
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;
  }
`;

const TabHeading = styled.div`
  height: 4rem;
  line-height: 4rem;

  h2{
    font-size: 2rem;
    font-weight: bold;
  }
`;

export { TabContainer, TabHeading };
