/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Button from './Button';

const PrimaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primaryText};
  border: ${(props) => props.theme.colors.primaryBorder};
  &[disabled] {
    background: ${(props) => props.theme.colors.disabled};
    color: ${(props) => props.theme.colors.disabledText};
    cursor: not-allowed
  }
`;

export default PrimaryButton;
