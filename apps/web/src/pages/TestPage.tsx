import { useTheme } from '@emotion/react';
import { Icon } from '@repo/ui';

export const TestPage = () => {
  const theme = useTheme();
  return (
    <div>
      <Icon
        name="add"
        fill={theme.palette.yellow700}
        stroke={theme.palette.yellow700}
      />
      <Icon name="arrowDown" fill={theme.palette.yellow700} />
      <Icon name="arrowLeft" fill={theme.palette.yellow700} />
      <Icon name="arrowRight" fill={theme.palette.yellow700} />
      <Icon name="arrowUp" fill={theme.palette.yellow700} />
      <Icon name="check" fill={theme.palette.yellow700} />
      <Icon name="close" fill={theme.palette.yellow700} />
      <Icon name="heart" fill={theme.palette.yellow700} />
      <Icon name="lock" fill={theme.palette.yellow700} />
      <Icon name="menu" fill={theme.palette.yellow700} />
      <Icon name="message" fill={theme.palette.yellow700} />
      <Icon name="minus" fill={theme.palette.yellow700} />
      <Icon name="person" fill={theme.palette.yellow700} />
    </div>
  );
};
