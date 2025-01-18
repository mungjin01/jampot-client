import '@emotion/react';

import palette from './styles/palette';
import typo from './styles/typo';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
  }
}
