import { TextField } from '../TextField/TextField';
import styled from '@emotion/styled';

type Props = Omit<React.ComponentProps<'input'>, 'size' | 'type'> &
  ButtonTextFieldProps;

interface ButtonTextFieldProps {
  warning?: boolean;
  buttonDisabled?: boolean;
  inputDisabled?: boolean;
  buttonText: string;
  buttonClickHandler: () => void;
}

export const ButtonTextField = ({
  warning,
  buttonDisabled,
  inputDisabled,
  buttonText,
  buttonClickHandler,
  ...rest
}: Props) => {
  return (
    <TextField warning={warning} disabled={inputDisabled} {...rest}>
      <Styled.Button onClick={buttonClickHandler} disabled={buttonDisabled}>
        {buttonText}
      </Styled.Button>
    </TextField>
  );
};

const Button = styled.button`
  padding: 6px 16px;
  border-radius: 8px;

  background: ${({ theme }) => theme.palette.gray800};
  color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => theme.typo.label2};

  &:disabled {
    background: ${({ theme }) => theme.palette.gray250};
    cursor: default;
  }
`;

const Styled = { Button };
