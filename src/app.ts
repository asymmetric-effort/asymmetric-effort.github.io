import '../css/index.css';
import { createElement, Router, Route, useRouter } from '@asymmetric-effort/specifyjs';
import { createRoot } from '@asymmetric-effort/specifyjs/dom';
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
  return createElement('main', { style: { textAlign: 'center', padding: '48px 24px' } },
    createElement('div', {
      style: { fontSize: '120px', fontWeight: '700', lineHeight: '1', opacity: '0.15' },
    }, '404'),
    createElement('h1', null, 'Page Not Found'),
    createElement('p', null, `The page "${pathname}" does not exist.`),
    createElement('button', {
      onClick: () => navigate('/'),
      style: {
        marginTop: '16px', padding: '8px 20px', border: '1px solid var(--color-primary)',
        borderRadius: 'var(--radius)', backgroundColor: 'var(--color-primary)',
        color: '#fff', cursor: 'pointer', fontSize: '14px',
      },
    }, 'Go Home'),
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
