import { createElement, Link } from '@asymmetric-effort/specifyjs';

let jsdLoaded = false;

function loadJsdWidget(): void {
  if (jsdLoaded) return;
  jsdLoaded = true;
  const script = document.createElement('script');
  script.setAttribute('data-jsd-embedded', '');
  script.setAttribute('data-key', 'aec9dd88-79aa-4df3-b245-19580322401a');
  script.setAttribute('data-base-url', 'https://jsd-widget.atlassian.com');
  script.src = 'https://jsd-widget.atlassian.com/assets/embed.js';
  document.body.appendChild(script);
}

export function Header() {
  return createElement('header', null,
    createElement(Link, { to: '/' },
      createElement('img', { src: '/logo.png', alt: 'Asymmetric Effort', className: 'logo' })
    ),
    createElement('nav', null,
      createElement(Link, { to: '/' }, 'About Us'),
      createElement(Link, { to: '/projects' }, 'Projects'),
      createElement(Link, { to: '/resources' }, 'Resources'),
      createElement('button', {
        className: 'contact-btn',
        onClick: () => loadJsdWidget(),
      }, 'Contact Us'),
    ),
  );
}
