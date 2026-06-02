import { createElement, useHead } from '@asymmetric-effort/specifyjs';

interface Resource {
  name: string;
  url: string;
  description: string;
}

const resources: Resource[] = [
  {
    name: 'Actions',
    url: 'https://actions.asymmetric-effort.com',
    description: 'Reusable GitHub Actions and CI/CD workflows for Asymmetric Effort projects.',
  },
  {
    name: 'Coding Standards',
    url: 'https://coding-standards.asymmetric-effort.com',
    description: 'Organization-wide coding standards and best practices for all Asymmetric Effort projects.',
  },
  {
    name: 'JsonLint',
    url: 'https://jsonlint.asymmetric-effort.com',
    description: 'A fast, browser-based JSON validator and formatter for verifying JSON syntax and structure.',
  },
  {
    name: 'YAMLlint',
    url: 'https://yamllint.asymmetric-effort.com',
    description: 'A browser-based YAML validator and formatter for verifying YAML syntax and structure.',
  },
];

export function Resources() {
  useHead({
    title: 'Asymmetric Effort - Resources',
    description: 'Developer resources, coding standards and reference materials for Asymmetric Effort projects.',
    keywords: 'coding standards, developer resources, best practices, Asymmetric Effort',
    og: {
      title: 'Asymmetric Effort - Resources',
      description: 'Developer resources, coding standards and reference materials for Asymmetric Effort projects.',
    },
  });
  return createElement('main', null,
    createElement('h1', null, 'Resources'),
    ...resources.map((resource) =>
      createElement('div', { className: 'project-card', key: resource.name },
        createElement('h2', null,
          createElement('a', { href: resource.url, target: '_blank', rel: 'noopener noreferrer' },
            resource.name
          )
        ),
        createElement('p', null, resource.description),
      )
    ),
  );
}
