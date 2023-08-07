import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin: 13px auto;
  min-height: fit-content;
  width: max-content;
  border: 1px solid ${({ theme }) => theme.colors.grey150};
  background-color: ${({ theme }) => theme.colors.grey00};
  border-radius: 20px;
  padding: 40px;
  &.login-form {
    margin: 70px auto;
  }
`;
