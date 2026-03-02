import { test, expect } from '@playwright/test';
import { login } from '../utils/loginUtil';

import dotenv from 'dotenv';
import { clear } from 'node:console';
dotenv.config({ quiet: true });
test.describe('Login Tests', () => { //Tc Added in describe group 

    //  test.use({ storageState: 'loginState.json' });
    test.beforeEach(async ({ page }) => { //Add tag and only smoke tc added in cicd 
        await page.goto('/');
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await page.locator('#form input[name="email"]').first().fill(process.env.EMAIL!);
        await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
    });

test('search for product after login2', { tag: ['@xyz'] }, async ({ page }) => {

    await page.getByRole('link', { name: 'Products' }).click();
    await page.getByRole('textbox', { name: 'Search Product' }).click();
    await page.waitForTimeout(1000); // Wait for 1 second after clicking search product
    
    await page.getByRole('textbox', { name: 'Search Product' }).fill('blue top');
    await page.locator('i.fa.fa-search').click();
});
test('Print all test case names', { tag: ['@xyz'] }, async ({ page }) => {
    // Click on 'Test Cases' button
    await page.locator('button').filter({ hasText: 'Test Cases' }).first().click();

    // Wait for at least one panel title to be visible
    await page.locator('.panel-title').first().waitFor();

    // Grab all test case names
    const testcaseLocators = page.locator('.panel-title');
    const count = await testcaseLocators.count();

    console.log('Total Test Cases:', count);

    for (let i = 0; i < count; i++) {
        const name = await testcaseLocators.nth(i).innerText();
        console.log(`Test Case ${i + 1}:`, name.trim());
    }
});

});



