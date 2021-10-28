import styled from "styled-components";

export const NavBar = styled.div`
  margin: 2rem;
  border-bottom: 1px solid #f2e529;
  border-top: 1px solid #f2e529;
  padding: 1rem;
  color: #3d3d3d;
  text-align: center;
  font-size: 3rem;
`;

export const FormContainer = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  align-items: center;
  border: 3px solid #747478;
  border-radius: 10px;
  margin: 5rem 5rem;
  padding: 2rem 0;
  background-color: white;
  > img {
    width: 20%;
    margin-top: 2rem;
  }
  > div {
    width: 70%;
    margin: 0.5rem 0 0.5rem 0;
  }
  > button {
    margin-top: 2.3rem;
    font-weight: bold;
    border: 2px solid #c2b721;
    &:hover {
      border: 2px solid #3d3d3d;
      color: #3d3d3d;
    }
    > span {
    }
  }
`;
export const Add = styled.div`
  display: flex;
  justify-content: flex-end;
`;
