import { chromium, FullConfig } from '@playwright/test';
import { login } from './utils/loginUtil';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await login(page);
  await page.context().storageState({ path: 'loginState.json' });

  await browser.close();
}

export default globalSetup;