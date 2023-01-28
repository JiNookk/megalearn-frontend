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
    min-height: 100vh;
  }
  a{
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }
  strong{
    font-weight: bold;
  }
  small{
    font-weight: normal;
  }
  #app{
    min-height: 100vh;
    
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
