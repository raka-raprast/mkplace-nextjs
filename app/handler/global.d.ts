/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
    Flutter: {
      postMessage: (message: string) => void;
    };
  }
  