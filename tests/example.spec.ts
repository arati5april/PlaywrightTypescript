import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Arati test ', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const logo = await page.getByRole('link', { name: 'GitHub repository' }).isVisible();
  await expect(logo).toBeTruthy();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
