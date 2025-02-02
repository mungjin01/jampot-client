import { SVGProps } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { icons } from './assets';

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  fill?: string;
  stroke?: string;
}

const IconContainer = styled.svg<IconProps>`
  path {
    fill: ${({ fill }) => fill};
    stroke: ${({ stroke }) => stroke || 'none'};
  }
`;

const Icon = ({ name, fill, stroke, className, ...rest }: IconProps) => {
  const SVG = icons[name];

  return (
    <IconContainer
      className={clsx(className)}
      fill={fill}
      stroke={stroke || 'none'}
      name={name}
      {...rest}
    >
      <SVG />
    </IconContainer>
  );
};

export { Icon };
