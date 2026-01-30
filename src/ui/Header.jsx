import styled from "styled-components"
import HeaderMune from "./HeaderMune";
import UserAvatar from "../features/authentication/UserAvatar"

const HeaderStyled = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: end;
`;

function Header() {
    return (
        <HeaderStyled>
            <UserAvatar/>
         <HeaderMune/>
        </HeaderStyled>
    )
}

export default Header
