import { useTheme } from '@emotion/react';

import { ButtonTextField, Icon, TextField } from '@repo/ui';

export const TestPage = () => {
  const theme = useTheme();
  function handleClick(): void {
    console.log('click');
  }

  return (
    <div>
      <Icon
        name="add"
        fill={theme.palette.yellow700}
        stroke={theme.palette.yellow700}
        size={24}
      />
      <Icon name="arrowDown" fill={theme.palette.yellow700} size={20} />
      <Icon name="arrowLeft" fill={theme.palette.yellow700} size={32} />

      <TextField width="312px" placeholder="테스트1" />
      <TextField width="312px" warning placeholder="테스트2(warning)" />
      <TextField width="312px" disabled placeholder="테스트3(disabled)" />
      <ButtonTextField
        buttonText="Text"
        buttonClickHandler={handleClick}
        inputDisabled={false}
        buttonDisabled={false}
        warning={false}
        placeholder="테스트테스트"
      />
    </div>
  );
};
