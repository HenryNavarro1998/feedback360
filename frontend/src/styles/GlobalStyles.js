import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.text};
    font-weight: 600;
    line-height: 1.2;
  }

  // Utilidades comunes
  .container {
    max-width: ${theme.breakpoints.desktop};
    margin: 0 auto;
    padding: 0 ${theme.spacing.medium};
  }

  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: ${theme.spacing.small}; }
  .mt-2 { margin-top: ${theme.spacing.medium}; }
  .mt-3 { margin-top: ${theme.spacing.large}; }
  .mt-4 { margin-top: ${theme.spacing.xlarge}; }

  .mb-1 { margin-bottom: ${theme.spacing.small}; }
  .mb-2 { margin-bottom: ${theme.spacing.medium}; }
  .mb-3 { margin-bottom: ${theme.spacing.large}; }
  .mb-4 { margin-bottom: ${theme.spacing.xlarge}; }

  /* Estilos para scrollbar personalizados */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`; 