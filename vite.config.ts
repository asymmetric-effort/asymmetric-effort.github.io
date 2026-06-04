import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const { specifyJsSeoPlugin, specifyJsNoscriptPlugin } = await import('@asymmetric-effort/specifyjs/build');
  return {
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    specifyJsSeoPlugin({
      siteUrl: 'https://asymmetric-effort.com',
      title: 'Asymmetric Effort',
      description: 'Asymmetric Effort builds open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
      routes: ['/', '/#/projects', '/#/resources', '/#/status'],
      author: 'Sam Caldwell',
      license: 'Proprietary',
      repository: 'https://github.com/asymmetric-effort',
    }),
    specifyJsNoscriptPlugin({
      title: 'Asymmetric Effort',
      description: 'Open-source frameworks, security tooling and collaboration platforms to help everyone stay safe online.',
      copyright: '\u00A9 2022-2026 Asymmetric Effort, LLC.',
      sections: [
        {
          id: 'about',
          title: 'About Us',
          html: `
            <p>We are Asymmetric Effort. Our mission is to improve cybersecurity through
            innovative approaches focused on helping everyone stay safe online. Whether you
            are a business or a consumer, our goal is to develop tools, solutions and systems
            which protect your identity, data and peace of mind.</p>
            <p>We build open-source frameworks, security tooling and collaboration platforms
            that empower developers and organizations to ship safer, more reliable software.</p>
          `,
        },
        {
          id: 'projects',
          title: 'Projects',
          html: `
            <ul>
              <li><a href="https://convocate.asymmetric-effort.com">Convocate</a> — A collaboration platform designed to bring teams together for secure, efficient communication and project coordination.</li>
              <li>GreyNet — Decentralized, peer-to-peer zero trust network access without reliance on centralized control planes.</li>
              <li><a href="https://leakdetector.asymmetric-effort.com">Leak Detector</a> — A zero-dependency Go CLI tool for detecting leaked secrets and sensitive information in git repositories.</li>
              <li><a href="https://github.com/asymmetric-effort/linux-oidc-plugin">Linux PAM OIDC</a> — A Linux PAM module enabling OpenID Connect (OIDC) authentication for system login.</li>
              <li><a href="https://nogginlessdom.asymmetric-effort.com">NogginLessDom</a> — A headless DOM implementation for server-side rendering and testing without a browser environment.</li>
              <li><a href="https://scrutineer.asymmetric-effort.com">Scrutineer</a> — Security analysis and auditing platform for identifying vulnerabilities and ensuring compliance across your infrastructure.</li>
              <li><a href="https://specifyjs.asymmetric-effort.com">SpecifyJS</a> — A declarative TypeScript UI framework with zero runtime dependencies, built-in routing, and a 56-component library in under 4KB gzipped.</li>
            </ul>
          `,
        },
        {
          id: 'resources',
          title: 'Resources',
          html: `
            <ul>
              <li><a href="https://actions.asymmetric-effort.com">Actions</a> — Reusable GitHub Actions and CI/CD workflows for Asymmetric Effort projects.</li>
              <li><a href="https://coding-standards.asymmetric-effort.com">Coding Standards</a> — Organization-wide coding standards and best practices for all Asymmetric Effort projects.</li>
              <li><a href="https://jsonlint.asymmetric-effort.com">JsonLint</a> — A fast, browser-based JSON validator and formatter for verifying JSON syntax and structure.</li>
              <li><a href="https://yamllint.asymmetric-effort.com">YAMLlint</a> — A browser-based YAML validator and formatter for verifying YAML syntax and structure.</li>
            </ul>
          `,
        },
        {
          id: 'status',
          title: 'Status',
          html: '<p>Service status requires JavaScript to perform live health checks.</p>',
        },
      ],
    }),
  ],
  };
});
