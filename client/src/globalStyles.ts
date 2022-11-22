import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    border: 0;
    padding: 0;
    margin: 0;
  }
  html {
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
  }
  body {
    background-color: #EFF6FC;
  }
`;