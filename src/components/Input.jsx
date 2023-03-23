import styled from '@emotion/styled';

const StyledImput = styled.input`
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  padding: 8px 12px;
  border: 1px solid #d3d3d3;
  background: #ffffff;
  width: 100%;
  &:focus {
    outline: none;
    border: 1px solid #d3d3d3;
  }
`;
export const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <div style={{ width: '100%' }}>
      {label && <label htmlFor={id || name}>{label}:</label>}
      <StyledImput
        type={type}
        name={name}
        id={id || name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
