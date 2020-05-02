export interface Styles {
  'app': string;
  'appLogo': string;
  'appLogoSpin': string;
  'appHeader': string;
  'appLink': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
