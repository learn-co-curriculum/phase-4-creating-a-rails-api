import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <Wrapper>
      <Logo>FlockBuster</Logo>
      <nav>
        <StyledLink exact to="/">
          Home
        </StyledLink>
        <StyledLink exact to="/new">
          Add Movie
        </StyledLink>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  background-color: blue;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 32px;
`;

const Logo = styled.h1`
  font-family: "Londrina Outline", cursive;
  margin: 0;
  color: yellow;
  font-size: 3rem;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: yellow;
  font-weight: bold;
  font-size: 1.25rem;
  margin: 8px;
  padding: 8px;

  &.active {
    border-bottom: 3px solid;
  }
`;

export default Header;
