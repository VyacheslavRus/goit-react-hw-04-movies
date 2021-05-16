import styled from "styled-components";

export const NavBarStyledd = styled.nav`
  border-bottom: 3px solid red;
  margin-bottom: 10px;
  .list {
    list-style: none;
    display: flex;
    align-items: center;
    margin-right: -15px;
  }
  .listItem {
    margin-right: 15px;
  }
  .link {
    text-decoration: none;
    text-transform: uppercase;
    color: tomato;
  }
  .activeLink {
    color: #66ff00;
  }
`;
