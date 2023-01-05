import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  html{
    height: 100%;
    scroll-behavior: smooth;
  }
  body{
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    height: 100%;
  }
  a{
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }
  strong{
    font-weight: bold;
  }
  #app{
    height: 100%;
  }
`;

export default GlobalStyle;
