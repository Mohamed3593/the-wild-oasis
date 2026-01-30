import styled from "styled-components";
   const StyledFormRow = styled.div`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;
    
      padding: 1.2rem 0;
    
      &:first-child {
        padding-top: 0;
      }
    
      &:last-child {
        padding-bottom: 0;
      }
    
      &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
      }
    
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `;
    
    const Label = styled.label`
      font-weight: 500;
    `;
    
    const Error = styled.span`
      font-size: 1.4rem;
      color: var(--color-red-700);
    `;
function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {/* you must link between the input and the lable so we take the name that is 
            the id in the input field */}
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {/* will make Error aside with the input field */}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow
