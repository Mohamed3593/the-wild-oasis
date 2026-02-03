import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  max-height: 20rem;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  margin-top: 4px;
`;

const DropdownItem = styled.li`
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.4rem;
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledContainer = styled.div`
  position: relative;
`;

function SearchableDropDown({
    options,
    onSelect,
    register,
    name,
    validation,
    disabled,
    id,
    currentValue,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalFilter, setInternalFilter] = useState("");

    const registerProps = register ? register(name, validation) : {};

    // Determine the value to filter by: either the currentValue passed from parent (watched) or local state if not provided
    const filterValue = currentValue !== undefined ? currentValue : internalFilter;

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes((filterValue || "").toLowerCase())
    );

    return (
        <StyledContainer>
            <Input
                id={id}
                autoComplete="off"
                disabled={disabled}
                {...props}
                {...registerProps}
                onFocus={(e) => {
                    setIsOpen(true);
                    registerProps.onFocus && registerProps.onFocus(e);
                }}
                onBlur={(e) => {
                    setTimeout(() => setIsOpen(false), 200);
                    registerProps.onBlur && registerProps.onBlur(e);
                }}
                onChange={(e) => {
                    setInternalFilter(e.target.value);
                    registerProps.onChange && registerProps.onChange(e);
                }}
            />
            {isOpen && filteredOptions.length > 0 && (
                <Dropdown>
                    {filteredOptions.map((opt, i) => (
                        <DropdownItem
                            key={i}
                            onMouseDown={(e) => {
                                // prevent blur from happening before click
                                e.preventDefault();
                            }}
                            onClick={() => {
                                onSelect(opt);
                                setInternalFilter(opt);
                                setIsOpen(false);
                            }}
                        >
                            {opt}
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
        </StyledContainer>
    );
}

export default SearchableDropDown;
