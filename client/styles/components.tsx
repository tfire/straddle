import styled from "styled-components";

export const ApplicationViewTile = styled.div`
  color: white;
  width: 100%;
  height: 20%;
`;

export const Header = styled.header`
  min-height: 30px;
  display: flex;
  color: white;
  align-content: space-between;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: top;
  height: 85vh;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  border: none;
  color: #fff;
  cursor: pointer;
  text-align: right;
  font-family: "Source Code Pro", monospace;
  font-size: 12.5px;
  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;
  text-align: right;
  font-family: "Source Code Pro", monospace;
  font-size: 12.5px;
  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const Button2 = styled.button`
  background-color: gray;
  border: none;
  color: white;
  cursor: pointer;
  text-align: right;
  font-family: "Source Code Pro", monospace;
  font-size: 12.5px;
`;

export const Modal = styled.div`
display: none;
position: fixed;
z-index: 1;
padding-top: 100px;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgb(0,0,0);
`;

export const ModalContent = styled.div`
  font-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;
