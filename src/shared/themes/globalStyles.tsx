import { Global, css } from '@emotion/react';

const globalStyles = css`
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  html {
    height: 100%;
  }
  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const GlobalStyles: React.FC = () => <Global styles={globalStyles} />;
