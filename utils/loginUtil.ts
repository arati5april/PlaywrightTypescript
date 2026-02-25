import type { Page } from '@playwright/test';

/**
 * Logs the user in using BASE_URL / EMAIL / PASSWORD from env.
 * Adjust selectors/URL if your app differs.
 */
export async function login() {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error('BASE_URL is not set');
  const { chromium } = require('playwright'); // Import chromium
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(baseUrl);

  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('#form input[name="email"]').first().fill(process.env.EMAIL!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  // Store the storage state (cookies, local storage, etc.) in 'loginState.json' at the project root
  const fs = require('fs');
  const path = require('path');
  const storageStatePath = path.join(process.cwd(), 'loginState.json');
  await context.storageState({ path: storageStatePath });

  // Optionally close the browser after saving the state
  await browser.close();
}
