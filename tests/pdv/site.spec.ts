import { test, expect } from '@playwright/test';

test.describe('Post-Deployment Verification', () => {

  test('homepage loads and enforces HTTPS in production', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
    const baseURL = process.env.PDV_BASE_URL || '';
    if (baseURL.startsWith('https://')) {
      expect(page.url()).toMatch(/^https:\/\//);
    }
  });

  test('homepage renders About Us content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#root')).not.toBeEmpty();
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('header contains logo', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('header img.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('alt', 'Asymmetric Effort');
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toContainText('About Us');
    await expect(page.locator('nav')).toContainText('Projects');
    await expect(page.locator('nav')).toContainText('Resources');
  });

  test('footer displays copyright with current year', async ({ page }) => {
    await page.goto('/');
    const year = new Date().getFullYear().toString();
    const footer = page.locator('footer');
    await expect(footer).toContainText('2022-' + year);
    await expect(footer).toContainText('Asymmetric Effort, LLC.');
  });

  test('footer displays version', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toContainText(/v\d+\.\d+\.\d+/);
  });

  test('projects page loads and lists all projects', async ({ page }) => {
    await page.goto('/#/projects');
    await expect(page.locator('h1')).toContainText('Current Projects');

    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(9);

    await expect(page.locator('.project-card >> text=SpecifyJS')).toBeVisible();
    await expect(page.locator('.project-card >> text=Scrutineer')).toBeVisible();
    await expect(page.locator('.project-card >> text=Convocate')).toBeVisible();
    await expect(page.locator('.project-card h2', { hasText: 'Actions' })).toBeVisible();
    await expect(page.locator('.project-card h2', { hasText: 'Linux PAM OIDC' })).toBeVisible();
    await expect(page.locator('.project-card h2', { hasText: 'GreyNet' })).toBeVisible();
    await expect(page.locator('.project-card h2', { hasText: 'JsonLint' })).toBeVisible();
    await expect(page.locator('.project-card h2', { hasText: 'YAMLlint' })).toBeVisible();
    await expect(page.locator('.project-card h2', { hasText: 'NogginLessDom' })).toBeVisible();
  });

  test('project links use HTTPS', async ({ page }) => {
    await page.goto('/#/projects');
    const links = page.locator('.project-card a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test('navigation between pages works', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('About Us');

    await page.locator('nav >> text=Projects').click();
    await expect(page.locator('h1')).toContainText('Current Projects');

    await page.locator('nav >> text=About Us').click();
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('favicon is served', async ({ request }) => {
    const response = await request.get('/favicon.ico');
    expect(response.status()).toBe(200);
  });

  test('logo image is served', async ({ request }) => {
    const response = await request.get('/logo.png');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('resources page loads and lists coding standards', async ({ page }) => {
    await page.goto('/#/resources');
    await expect(page.locator('h1')).toContainText('Resources');

    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(1);

    const link = page.locator('.project-card a', { hasText: 'Coding Standards' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://coding-standards.asymmetric-effort.com');
  });

  test('all internal navigation links work', async ({ page }) => {
    // Collect all unique hash routes from nav links across all pages
    const routes = ['/', '/#/projects', '/#/resources'];
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('#root')).not.toBeEmpty();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('all external links return a valid response', async ({ page, request }) => {
    const routes = ['/', '/#/projects', '/#/resources'];
    const externalLinks = new Set<string>();

    // Collect all external links across all pages
    for (const route of routes) {
      await page.goto(route);
      await page.waitForTimeout(500);
      const links = page.locator('a[href^="https://"]');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');
        if (href) externalLinks.add(href);
      }
    }

    expect(externalLinks.size).toBeGreaterThan(0);

    // Verify each external link returns a non-error response
    const failures: string[] = [];
    for (const url of externalLinks) {
      try {
        const response = await request.get(url, { timeout: 15_000 });
        if (response.status() >= 400) {
          failures.push(`${url} returned ${response.status()}`);
        }
      } catch (err: any) {
        failures.push(`${url} failed: ${err.message}`);
      }
    }

    if (failures.length > 0) {
      throw new Error('Broken external links:\n' + failures.join('\n'));
    }
  });

  test('logo image src is not broken', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('header img.logo');
    const src = await logo.getAttribute('src');
    expect(src).toBeTruthy();
    // Verify the image actually loaded (naturalWidth > 0)
    const loaded = await logo.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    );
    expect(loaded).toBe(true);
  });

  test('project list container is scrollable', async ({ page }) => {
    await page.goto('/#/projects');
    const projectList = page.locator('.project-list');
    await expect(projectList).toBeVisible();
    const overflowY = await projectList.evaluate(
      (el) => getComputedStyle(el).overflowY
    );
    expect(overflowY).toBe('auto');
  });

  test('new projects have correct links', async ({ page }) => {
    await page.goto('/#/projects');

    const jsonlintLink = page.locator('.project-card a', { hasText: 'JsonLint' });
    await expect(jsonlintLink).toHaveAttribute('href', 'https://jsonlint.asymmetric-effort.com');

    const yamllintLink = page.locator('.project-card a', { hasText: 'YAMLlint' });
    await expect(yamllintLink).toHaveAttribute('href', 'https://yamllint.asymmetric-effort.com');

    const nogginlessdomLink = page.locator('.project-card a', { hasText: 'NogginLessDom' });
    await expect(nogginlessdomLink).toHaveAttribute('href', 'https://nogginlessdom.asymmetric-effort.com');
  });

  test('GreyNet project has no external link', async ({ page }) => {
    await page.goto('/#/projects');
    const greynetCard = page.locator('.project-card', { hasText: 'GreyNet' });
    await expect(greynetCard).toBeVisible();
    const links = greynetCard.locator('a');
    await expect(links).toHaveCount(0);
  });

  test('unknown route renders 404 error page', async ({ page }) => {
    await page.goto('/#/mybadUrlExpects404');
    await expect(page.locator('#root')).not.toBeEmpty();

    // Must show 404 status code in the error display
    await expect(page.getByText('404', { exact: true })).toBeVisible();

    // Must show "Page Not Found" title
    await expect(page.getByText('Page Not Found')).toBeVisible();

    // Must show the bad path in the description
    const description = page.locator('p', { hasText: '/mybadUrlExpects404' });
    await expect(description).toBeVisible();

    // Header and footer must still be present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('404 page has a working Go Home action', async ({ page }) => {
    await page.goto('/#/mybadUrlExpects404');
    await expect(page.getByText('404', { exact: true })).toBeVisible();

    // Click the Go Home button
    await page.getByText('Go Home').click();
    await page.waitForTimeout(500);

    // Should navigate back to the home page
    expect(page.url()).toContain('#/');
    await expect(page.locator('h1')).toContainText('About Us');
  });

});
