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
        size={24}
      />
      <Icon name="arrowDown" fill={theme.palette.yellow700} size={20} />
      <Icon name="arrowLeft" fill={theme.palette.yellow700} size={32} />
    </div>
  );
};
