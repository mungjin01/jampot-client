import { forwardRef } from 'react';
import styled from '@emotion/styled';

type Props = Omit<React.ComponentProps<'input'>, 'size' | 'type'> &
  TextFieldProps;

interface TextFieldProps {
  children?: React.ReactNode;
  width?: string | number;
  disabled?: boolean;
  warning?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ children, width, disabled, warning, ...rest }, ref) => {
    return (
      <Styled.Container width={width} disabled={disabled} warning={warning}>
        <input type="text" ref={ref} {...rest} disabled={disabled} />
        {children}
      </Styled.Container>
    );
  }
);

TextField.displayName = 'TextField';

const Container = styled.div<TextFieldProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.13);

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.palette.gray700};
    ${({ theme }) => theme.typo.body2r};

    &::placeholder {
      color: ${({ theme }) => theme.palette.gray300};
    }

    &:focus {
      background-color: transparent;
    }
  }

  &:focus-within {
    background-color: ${({ theme }) => theme.palette.gray100};
  }

  ${({ warning, theme }) =>
    warning &&
    `border-color: ${theme.palette.red500}; 
+    background-color: ${theme.palette.gray100}; 
+    input { 
+      color: ${theme.palette.red700};
+    }
+  `}

  ${({ disabled, theme }) =>
    disabled &&
    `background-color: ${theme.palette.gray200}; 
     input { 
      color: ${theme.palette.gray400}; 
    }
  `}
`;

const Styled = { Container };
