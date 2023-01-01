import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  padding: .5em;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &[disabled] {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export default Button;
