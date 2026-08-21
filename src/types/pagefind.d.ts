import type React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'pagefind-config': React.HTMLAttributes<HTMLElement> & {
        lang?: string;
      };
      'pagefind-input': React.HTMLAttributes<HTMLElement>;
      'pagefind-results': React.HTMLAttributes<HTMLElement>;
      'pagefind-modal-trigger': React.HTMLAttributes<HTMLElement>;
      'pagefind-modal': React.HTMLAttributes<HTMLElement>;
    }
  }
}
