import { createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

// const StyledMenu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContex = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const [buttonElement, setButtonElement] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContex.Provider
      value={{
        openId,
        open,
        close,
        position,
        setPosition,
        buttonElement,
        setButtonElement,
      }}
    >
      {children}
    </MenusContex.Provider>
  );
}

function Toggle({ id }) {
  const { open, openId, close, setPosition, setButtonElement } =
    useContext(MenusContex);

  function handleClick(e) {
    e.stopPropagation()
    const button = e.target.closest("button");
    const rec = button.getBoundingClientRect();

    setButtonElement(button);
    setPosition({
      x: window.innerWidth - rec.width - rec.x,
      y: rec.y + rec.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close, buttonElement } = useContext(MenusContex);
  const ref = useOutsideClick(close,false);
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    if (id !== openId || !buttonElement) return;

    function updatePosition() {
      const rec = buttonElement.getBoundingClientRect();
      setCurrentPosition({
        x: window.innerWidth - rec.width - rec.x,
        y: rec.y + rec.height + 8,
      });
    }

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [id, openId, buttonElement]);

  if (id !== openId || !currentPosition) return null;

  return createPortal(
    <StyledList position={currentPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContex);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton onClick={handleClick}>
      {icon} <span>{children}</span>
    </StyledButton>
  );
}

function Menu({ children }) {
  return <div>{children}</div>;
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
