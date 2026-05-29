import { createElement } from '@asymmetric-effort/specifyjs';
import { VERSION } from '../version';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return createElement('footer', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderTop: '1px solid var(--color-border, #e2e8f0)',
      fontSize: '13px',
      color: 'var(--color-text-muted, #64748b)',
    },
  },
    createElement('span', null, `v${VERSION}`),
    createElement('span', null, `\u00A9 2022-${currentYear} Asymmetric Effort, LLC.`),
    createElement('a', {
      href: 'https://github.com/asymmetric-effort',
      style: { color: 'var(--color-primary, #3b82f6)', textDecoration: 'none' },
    }, 'GitHub'),
  );
}
