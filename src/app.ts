import '../css/index.css';
import { createElement, Router, Route, useRouter } from '@asymmetric-effort/specifyjs';
import { createRoot } from '@asymmetric-effort/specifyjs/dom';
import { EmptyState } from '@asymmetric-effort/specifyjs/components';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutUs } from './pages/AboutUs';
import { Projects } from './pages/Projects';
import { Resources } from './pages/Resources';

// Detect system dark mode preference
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(dark: boolean): void {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}
applyTheme(darkQuery.matches);
darkQuery.addEventListener('change', (e) => applyTheme(e.matches));

// Enforce HTTPS in production
if (
  location.protocol === 'http:' &&
  location.hostname !== 'localhost' &&
  location.hostname !== '127.0.0.1'
) {
  location.replace('https://' + location.host + location.pathname + location.search + location.hash);
}

const knownPaths = ['/', '/projects', '/resources'];

function NotFoundGuard() {
  const { pathname, navigate } = useRouter();
  if (knownPaths.includes(pathname)) return null;
  return createElement('main', null,
    createElement(EmptyState, {
      title: '404 — Page Not Found',
      description: `The page "${pathname}" does not exist.`,
      actionLabel: 'Go Home',
      onAction: () => navigate('/'),
    }),
  );
}

function App() {
  return createElement(Router, null,
    createElement(Header, null),
    createElement(Route, { path: '/', component: AboutUs, exact: true }),
    createElement(Route, { path: '/projects', component: Projects }),
    createElement(Route, { path: '/resources', component: Resources }),
    createElement(NotFoundGuard, null),
    createElement(Footer, null),
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(createElement(App, null));
}
