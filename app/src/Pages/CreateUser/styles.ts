import styled from "styled-components";

export const ContainerForm = styled.div`
  display: flex;
  width: 100%;
`;
export const Form = styled.div`
  display: flex;
  width: 50%;

`;
export const Vector = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  > img {
    width: 80%;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border: 3px solid #747478;
  border-radius: 10px;
  margin: 0rem 5rem;
  margin-top: -2rem;
  padding: 2rem 0;
  background-color:white;
  >img{
    width:20%;
    margin-top: 2rem;
  }
  >div{
    width:70%;
    margin: 0.5rem 0 0.5rem 0;
  }
  >button{
    margin-top:2rem;
    font-weight: bold;
    border:2px solid #c2b721;
    &:hover{
      border:2px solid #3d3d3d;
      color:#3d3d3d;
    }
    >span{
    }
  }
`;

export const Add = styled.div`
width: 50%;
  display: flex;
  justify-content:flex-start;
`;
