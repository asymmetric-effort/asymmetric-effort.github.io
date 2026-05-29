import '../css/index.css';
import { createElement, Router, Route, useRouter } from '@asymmetric-effort/specifyjs';
import { createRoot } from '@asymmetric-effort/specifyjs/dom';
// EmptyState removed — using inline 404 component
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
    createElement('h1', null, '404'),
    createElement('h2', null, 'Page Not Found'),
    createElement('p', null, `The page "${pathname}" does not exist.`),
    createElement('button', { onclick: () => navigate('/') }, 'Go Home'),
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
  // Minimal sanity check — does createElement + createRoot work at all?
  root.setAttribute('data-framework-test', 'starting');
  try {
    const testEl = createElement('div', null, 'framework-works');
    root.setAttribute('data-framework-test', 'createElement-ok');
    const r = createRoot(root);
    root.setAttribute('data-framework-test', 'createRoot-ok');
    r.render(createElement(App, null));
    root.setAttribute('data-framework-test', 'render-ok');
  } catch (err: unknown) {
    root.setAttribute('data-framework-test', 'error: ' + String(err));
    root.textContent = 'RENDER ERROR: ' + String(err);
  }
}
