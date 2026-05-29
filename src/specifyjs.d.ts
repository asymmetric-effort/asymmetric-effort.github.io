declare module '@asymmetric-effort/specifyjs' {
  export function createElement(type: any, props: any, ...children: any[]): any;
  export function useState<T>(initial: T | (() => T)): [T, (v: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useHead(meta: {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    canonical?: string;
    og?: Record<string, string>;
    meta?: Array<{ name?: string; property?: string; content: string }>;
  }): void;
  export function Router(props: { children?: any }): any;
  export function Route(props: { path: string; component: any; exact?: boolean }): any;
  export function Link(props: { to: string; className?: string; activeClassName?: string; children?: any }): any;
  export function useRouter(): { pathname: string; params: Record<string, string>; navigate: (to: string) => void };
  export function useParams(): Record<string, string>;
  export function useNavigate(): (to: string, options?: { replace?: boolean }) => void;
}

declare module '@asymmetric-effort/specifyjs/components' {
  export function Footer(props: {
    left?: unknown;
    center?: unknown;
    right?: unknown;
    borderTop?: string;
    background?: string;
    color?: string;
    fontSize?: string;
    padding?: string;
    maxWidth?: string;
    className?: string;
    ariaLabel?: string;
  }): any;
  export function EmptyState(props: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  }): any;
}

declare module '@asymmetric-effort/specifyjs/dom' {
  export function createRoot(container: Element | null): { render(element: any): void };
}

declare module '@asymmetric-effort/specifyjs/build' {
  export function specifyJsSeoPlugin(options: {
    siteUrl: string;
    title: string;
    description: string;
    routes: string[];
    author?: string;
    license?: string;
    repository?: string;
  }): any;
  export function specifyJsNoscriptPlugin(options: {
    title: string;
    description: string;
    copyright: string;
    sections: Array<{
      id: string;
      title: string;
      html: string;
    }>;
  }): any;
}
