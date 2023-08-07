import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin: 70px auto;
  width: max-content;
  border: 1px solid ${({ theme }) => theme.colors.grey150};
  background-color: ${({ theme }) => theme.colors.grey00};
  border-radius: 20px;
  padding: 40px;

  .form-title{
    display: flex;
    word-break: normal;
    color: ${({ theme }) => theme.colors.grey300};
    padding: 0px;
    margin-bottom: 13px;
  }

  .form-subtitle{
    display: flex;
    align-self: center;
    word-break: normal;
    max-width: 80%;
  }

  .link:hover{
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }  
`;
