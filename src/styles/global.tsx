import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {    
    background-color: ${({ theme }) => theme.colors.grey400};
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  ::-webkit-scrollbar{
    width: 10px;
    background-color: rgba(0, 0, 0, 0.13);
  }

  ::-webkit-scrollbar-thumb{
    background-color: rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;    
    user-select: none;
  }

  img{
    max-width: 100%;
  }
    
  button{
    cursor: pointer;
    border: none;
  }
  
  dialog{
    display: unset;
    position: unset;
  }
  
  .form-title{
    display: flex;
    word-break: normal;
    color: ${({ theme }) => theme.colors.grey300};
    padding: 7px;
    margin-bottom: 13px;
  }

  .form-subtitle{
    display: flex;
    align-self: center;
    word-break: normal;
    
    padding: 13px;
    max-width: 80%;
  }

  .link:hover{
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }  
  .MuiDialogContent-root{
    display: flex;
    overflow-x: hidden;
    height: max-content;
    form{
      height: max-content;

    }
  }
`;

export const Container = styled.div`
  max-width: 90vw;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 20px;

  @media (min-width: 800px) {
    max-width: 85vw;
  }
`;
