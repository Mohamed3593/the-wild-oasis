import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const Main = styled.main`
  padding: 4rem 4.8rem 6.8rem;
  background-color: var(--color-grey-50);
  /* to make the other parts of the page fiexed(header and the asidebar)ميتحركوش مع ال scroll */
  overflow-y: auto;
  overflow-x: hidden;
`;
const StyledAppcomponent = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <StyledAppcomponent>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppcomponent>
  );
}

export default AppLayout;
