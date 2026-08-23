declare module '*.svg' {
  import { ComponentType, SVGProps } from 'react';
  const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
