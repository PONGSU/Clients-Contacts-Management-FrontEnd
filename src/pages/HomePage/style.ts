import styled from "styled-components";

export const StyledHomePage = styled.main`
  display: flex;
  flex-direction: column;
  margin: 70px auto;
  height: 100vh;
  max-width: 1200px;
  border: 1px solid ${({ theme }) => theme.colors.grey150};
  background-color: ${({ theme }) => theme.colors.grey00};
  border-radius: 20px;
  padding: 40px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    h1 {
      color: ${({ theme }) => theme.colors.primary};
    }
    button {
      margin: -50px -30px 0 0;
      display: flex;
      gap: 13px;
    }
    svg {
      font-size: 30px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    padding: 13px;
    margin-bottom: 50px;
    color: ${({ theme }) => theme.colors.grey00};
    gap: 7px;
    position: relative;

    span {
      display: flex;
      justify-content: space-between;
      padding: 0 13px;
    }

    h4 {
      margin-left: 7px;
    }

    .btn-create-ctt {
      position: absolute;
      right: 25px;
      margin-top: -40px;
      justify-self: flex-end;
    }
  }

  .contact-subtitle {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 30px;
  }

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 27px;
  }

  .contact-card {
    display: flex;
    justify-content: space-between;
    width: 470px;
    padding: 13px;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.grey00};
    background-color: ${({ theme }) => theme.colors.primary};
    span {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
  }

  @media (max-width: 1400px) {
    .form-section {
      width: 30vw;
    }
  }

  @media (max-width: 1200px) {
    .form-section {
      width: 360px;
    }
  }

  @media (max-width: 400px) {
    .form-section {
      width: 94vw;
      padding: 20px;
    }
  }

  @media (max-height: 700px) {
    height: 700px;

    .image-section {
      height: 100%;
    }
  }
`;
