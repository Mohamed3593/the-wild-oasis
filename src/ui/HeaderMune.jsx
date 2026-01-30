import styled from "styled-components"
import Logout from "../features/authentication/Logout"
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMune=styled.ul`
    display: flex;
    gap: 0.8rem;

`
function HeaderMune() {
    const naviagte=useNavigate()
    return (
      <StyledHeaderMune>
        <li>
          <ButtonIcon onClick={() => naviagte("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li><DarkModeToggle/></li>
        <li>
          <Logout />
        </li>
      </StyledHeaderMune>
    );
}

export default HeaderMune
