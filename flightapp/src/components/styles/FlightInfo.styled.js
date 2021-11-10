import styled from "styled-components";

export const ApiSection = styled.section`
  height: 40vh;
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  justify-content: center;

  div {
    width: 90%;
  }
`;
