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
  // border-radius: 8px;
