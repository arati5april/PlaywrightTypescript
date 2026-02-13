import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config({ quiet: true });
test.describe('Login Tests', () => { //Tc Added in describe group 
    test.beforeEach( async ({ page }) => { //Add tag and only smoke tc added in cicd 
        await page.goto('/');
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await page.locator('#form input[name="email"]').first().fill(process.env.EMAIL!);
        await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
    });
    test('search for product after login', { tag: ['@abc'] }, async ({ page }) => {
        await page.getByRole('link', { name: ' Products' }).click();
        await page.getByRole('textbox', { name: 'Search Product' }).click();
        await page.getByRole('textbox', { name: 'Search Product' }).fill('blue top');
        await page.locator('i.fa.fa-search').click();
    });

    test('Get testcase count', { tag: ['@abc'] }, async ({ page }) => {
        await page.locator('button').filter({ hasText: 'Test Cases' }).first().click();
        await page.locator('.panel-title').first().waitFor()
        const testCount= await  page.locator('.panel-title').count()
        console.log("Testcase Count=", testCount)
    });
});



