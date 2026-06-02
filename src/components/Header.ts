import { createElement, Link, useState, useEffect } from '@asymmetric-effort/specifyjs';
import { Modal } from '@asymmetric-effort/specifyjs/components';

export function Header() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!contactOpen) return;
    // Load the JIRA Service Management widget script into the modal
    const container = document.getElementById('jsd-widget-container');
    if (!container) return;
    const script = document.createElement('script');
    script.setAttribute('data-jsd-embedded', '');
    script.setAttribute('data-key', 'aec9dd88-79aa-4df3-b245-19580322401a');
    script.setAttribute('data-base-url', 'https://jsd-widget.atlassian.com');
    script.src = 'https://jsd-widget.atlassian.com/assets/embed.js';
    container.appendChild(script);
    return () => {
      container.innerHTML = '';
    };
  }, [contactOpen]);

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
        onClick: () => setContactOpen(true),
      }, 'Contact Us'),
    ),
    createElement(Modal, {
      open: contactOpen,
      onClose: () => setContactOpen(false),
      title: 'Contact Us',
    },
      createElement('div', { id: 'jsd-widget-container', style: { minHeight: '400px' } }),
    ),
  );
}
