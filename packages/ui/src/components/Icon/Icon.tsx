import { SVGProps } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { icons } from './assets';

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  fill?: string;
  stroke?: string;
  size?: number;
}

const IconContainer = styled.svg<IconProps>`
  width: ${({ size }) => (size ? `${size}px` : 'auto')};
  height: ${({ size }) => (size ? `${size}px` : 'auto')};

  path {
    fill: ${({ fill }) => fill};
    stroke: ${({ stroke }) => stroke || 'none'};
  }
`;

const Icon = ({ name, fill, stroke, size, className, ...rest }: IconProps) => {
  const SVG = icons[name];

  return (
    <IconContainer
      className={clsx(className)}
      fill={fill}
      stroke={stroke || 'none'}
      size={size}
      name={name}
      {...rest}
    >
      <SVG width="100%" height="100%" />
    </IconContainer>
  );
};

export { Icon };
