import { createElement, useHead } from '@asymmetric-effort/specifyjs';

interface Project {
  name: string;
  url?: string;
  description: string;
}

const projects: Project[] = [
  {
    name: 'Convocate',
    url: 'https://convocate.asymmetric-effort.com',
    description:
      'A collaboration platform designed to bring teams together for secure, ' +
      'efficient communication and project coordination.',
  },
  {
    name: 'GreyNet',
    description:
      'GreyNet provides decentralized, peer-to-peer zero trust network access ' +
      'without reliance on centralized control planes. Nodes authenticate and ' +
      'authorize each other directly using cryptographic identity, establishing ' +
      'secure channels only after mutual verification.',
  },
  {
    name: 'Leak Detector',
    url: 'https://leakdetector.asymmetric-effort.com',
    description:
      'A zero-dependency Go CLI tool for detecting leaked secrets and ' +
      'sensitive information in git repositories.',
  },
  {
    name: 'Linux PAM OIDC',
    url: 'https://github.com/asymmetric-effort/linux-oidc-plugin',
    description:
      'A Linux PAM module enabling OpenID Connect (OIDC) authentication for ' +
      'system login, providing federated identity support at the OS level.',
  },
  {
    name: 'NogginLessDom',
    url: 'https://nogginlessdom.asymmetric-effort.com',
    description:
      'A headless DOM implementation for server-side rendering and testing ' +
      'without a browser environment.',
  },
  {
    name: 'Scrutineer',
    url: 'https://scrutineer.asymmetric-effort.com',
    description:
      'Security analysis and auditing platform for identifying vulnerabilities ' +
      'and ensuring compliance across your infrastructure.',
  },
  {
    name: 'SpecifyJS',
    url: 'https://specifyjs.asymmetric-effort.com',
    description:
      'A declarative TypeScript UI framework with zero runtime dependencies, ' +
      'built-in routing, and a 56-component library in under 4KB gzipped.',
  },
];

export function Projects() {
  useHead({
    title: 'Asymmetric Effort - Projects',
    description: 'Open-source projects by Asymmetric Effort including SpecifyJS, Scrutineer, Convocate, Leak Detector, Linux PAM OIDC, GreyNet and NogginLessDom.',
    keywords: 'SpecifyJS, Scrutineer, Convocate, Leak Detector, Linux PAM OIDC, GreyNet, NogginLessDom, open source, TypeScript, security, collaboration',
    og: {
      title: 'Asymmetric Effort - Projects',
      description: 'Open-source projects by Asymmetric Effort including SpecifyJS, Scrutineer, Convocate, Actions, Linux PAM OIDC, GreyNet, JsonLint, YAMLlint and NogginLessDom.',
    },
  });
  return createElement('main', null,
    createElement('h1', null, 'Current Projects'),
    createElement('div', { className: 'project-list' },
      ...projects.map((project) =>
        createElement('div', { className: 'project-card', key: project.name },
          createElement('h2', null,
            project.url
              ? createElement('a', { href: project.url, target: '_blank', rel: 'noopener noreferrer' }, project.name)
              : project.name
          ),
          createElement('p', null, project.description),
        )
      ),
    ),
  );
}
