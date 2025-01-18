import styled from '@emotion/styled';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.palette.yellow500};
  color: ${({ theme }) => theme.palette.white};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.typo.label1m};
  cursor: pointer;

  &:hover {
    ${({ theme }) => theme.palette.yellow600};
  }
`;
