import { icons, colors } from './pages/api/_const';

declare module 'README.md' {
  export default string;
}

declare global {
  declare type Icons = keyof typeof icons;
  declare type Colors = keyof typeof colors;
}
