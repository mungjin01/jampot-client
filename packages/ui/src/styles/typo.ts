import { css } from '@emotion/react';

const generateTypo = (weight: number, size: number, lineHeight: number) => css`
  font-family:
    'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;

  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}px;
`;

const typo = {
  d1: generateTypo(500, 82, 100),
  d2: generateTypo(500, 65, 80),
  h1: generateTypo(700, 50, 60),
  h2: generateTypo(700, 40, 50),
  title1: generateTypo(700, 32, 40),
  title2: generateTypo(500, 25, 32),
  body1b: generateTypo(700, 20, 28),
  body1m: generateTypo(500, 18, 28),
  body1r: generateTypo(400, 18, 28),
  body2m: generateTypo(500, 16, 24),
  body2r: generateTypo(400, 16, 24),
  label1m: generateTypo(500, 14, 20),
  label1r: generateTypo(400, 14, 20),
  label2: generateTypo(500, 12, 20),
} as const;

export default typo;
