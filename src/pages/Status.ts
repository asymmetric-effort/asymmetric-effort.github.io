import { createElement, useHead, useState, useEffect } from '@asymmetric-effort/specifyjs';

type HealthStatus = 'pending' | 'healthy' | 'unhealthy';

interface SiteConfig {
  name: string;
  url: string;
}

const sites: SiteConfig[] = [
  { name: 'Asymmetric Effort', url: 'https://asymmetric-effort.com' },
  { name: 'Actions', url: 'https://actions.asymmetric-effort.com' },
  { name: 'Coding Standards', url: 'https://coding-standards.asymmetric-effort.com' },
  { name: 'Convocate', url: 'https://convocate.asymmetric-effort.com' },
  { name: 'JsonLint', url: 'https://jsonlint.asymmetric-effort.com' },
  { name: 'Leak Detector', url: 'https://leakdetector.asymmetric-effort.com' },
  { name: 'NogginLessDom', url: 'https://nogginlessdom.asymmetric-effort.com' },
  { name: 'Scrutineer', url: 'https://scrutineer.asymmetric-effort.com' },
  { name: 'SpecifyJS', url: 'https://specifyjs.asymmetric-effort.com' },
  { name: 'YAMLlint', url: 'https://yamllint.asymmetric-effort.com' },
];

function StatusIcon({ status }: { status: HealthStatus }) {
  if (status === 'pending') {
    return createElement('span', {
      className: 'status-icon status-pending',
      'aria-label': 'Checking',
    }, '?');
  }
  if (status === 'healthy') {
    return createElement('span', {
      className: 'status-icon status-healthy',
      'aria-label': 'Healthy',
    }, '\u2713');
  }
  return createElement('span', {
    className: 'status-icon status-unhealthy',
    'aria-label': 'Unhealthy',
  }, '\u2717');
}

function StatusRow({ site, status }: { site: SiteConfig; status: HealthStatus }) {
  return createElement('div', { className: 'status-row' },
    createElement(StatusIcon, { status }),
    createElement('a', {
      href: site.url,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'status-name',
    }, site.name),
    createElement('span', { className: 'status-url' }, site.url),
  );
}

export function Status() {
  useHead({
    title: 'Asymmetric Effort - Status',
    description: 'Live health status of all Asymmetric Effort websites and services.',
    keywords: 'status, health check, uptime, Asymmetric Effort',
    og: {
      title: 'Asymmetric Effort - Status',
      description: 'Live health status of all Asymmetric Effort websites and services.',
    },
  });

  const [results, setResults] = useState<Record<string, HealthStatus>>({});

  useEffect(() => {
    let cancelled = false;

    async function checkAll() {
      for (const site of sites) {
        if (cancelled) return;
        try {
          const resp = await fetch(site.url, { mode: 'no-cors', cache: 'no-store' });
          // no-cors returns opaque response (status 0) but confirms network reachability
          if (!cancelled) {
            setResults((prev: Record<string, HealthStatus>) => ({ ...prev, [site.url]: 'healthy' }));
          }
        } catch {
          if (!cancelled) {
            setResults((prev: Record<string, HealthStatus>) => ({ ...prev, [site.url]: 'unhealthy' }));
          }
        }
      }
    }

    checkAll();
    return () => { cancelled = true; };
  }, []);

  return createElement('main', null,
    createElement('h1', null, 'Site Status'),
    createElement('div', { className: 'status-list' },
      ...sites.map((site) =>
        createElement(StatusRow, {
          key: site.url,
          site,
          status: results[site.url] || 'pending',
        }),
      ),
    ),
  );
}
