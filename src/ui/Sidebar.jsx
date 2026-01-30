import styled from "styled-components"
import Logo from "./Logo"
import MainNav from "./MainNav"
import Uploader from "../data/Uploader"

function Sidebar() {

    const SidebarStyled = styled.aside`
      background-color: var(--color-grey-0);
      padding: 3.2rem 2.4rem;
      border-right: 3px solid var(--color-grey-100);
      grid-row: 1/-1;
      display: flex;
      flex-direction: column;
      gap: 3.2rem;
    `;
    return (
        <SidebarStyled>
            <Logo />
            <MainNav />
            <Uploader/>
        </SidebarStyled>
    )
}

export default Sidebar
