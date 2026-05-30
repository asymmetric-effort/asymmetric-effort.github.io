import { createElement } from '@asymmetric-effort/specifyjs';
import { Footer as FooterComponent } from '@asymmetric-effort/specifyjs/components';
import { VERSION } from '../version';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const left = createElement(
    'span',
    null,
    `v${VERSION}`,
  );

  const center = createElement(
    'span',
    null,
    `\u00A9 2022-${currentYear} Asymmetric Effort, LLC.`,
  );

  const right = createElement(
    'a',
    {
      href: 'https://github.com/asymmetric-effort',
      style: { color: 'var(--color-primary, #3b82f6)', textDecoration: 'none' },
    },
    'GitHub',
  );

  return createElement(FooterComponent, { left, center, right });
}
