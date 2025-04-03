export {};

declare global {
  interface Window {
    electronAPI?: {
      noifyLoginSuccess: () => void;
    };
  }
}
