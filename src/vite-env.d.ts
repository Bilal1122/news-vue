/// <reference types="vite/client" />

declare module '*.vue' {
  // import type { DefineComponent } from 'vue';
  // const component: DefineComponent<{}, {}, any>;
  // export default component;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}

declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_API_KEY: string;
    VUE_APP_BASE_URL: string;
    // Add more environment variables here
  }
}
