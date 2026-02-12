import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config({ quiet: true });
test.describe('Login Tests', () => {
    test('mytest', { tag: ['@regression'] }, async ({ page }) => {
        await page.goto(process.env.BASE_URL!);
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await page.locator('#form input[name="email"]').first().fill(process.env.EMAIL!);
        await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
    });
});



