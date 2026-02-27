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




    test('search for product after login', { tag: ['@abc'] }, async ({ page }) => {

        await page.getByRole('link', { name: 'Products' }).click();
        await page.getByRole('textbox', { name: 'Search Product' }).click();
        await page.getByRole('textbox', { name: 'Search Product' }).fill('blue top');
        await page.locator('i.fa.fa-search').click();
    });

    test('Get testcase count', { tag: ['@abc'] }, async ({ page }) => {
        await page.locator('button').filter({ hasText: 'Test Cases' }).first().click();
        await page.locator('.panel-title').first().waitFor()
        const testCount = await page.locator('.panel-title').count()
        console.log("Testcase Count=", testCount)
    });
    test('Print all test cases names', { tag: ['@abc'] }, async ({ page }) => {
        await page.locator('button').filter({ hasText: 'Test Cases' }).first().click();
        await page.locator('.panel-title').first().waitFor();
        const panelTitles = await page.locator('.panel-title').allTextContents();
        console.log('All Test Case Names:');
        panelTitles.forEach((title, idx) => {
            console.log(`${idx + 1}: ${title}`);
        });
    });
    test('Print All api name', { tag: ['@abc'] }, async ({ page }) => {
        await page.locator('button').filter({ hasText: 'APIs list for practice' }).first().click();
        await page.locator('.panel-title').first().waitFor();
        const PanelTitles = await page.locator('.panel-title').allTextContents();
        console.log('All Test Case Names:');
        PanelTitles.forEach((title, idx) => {
            console.log(`${idx + 1}: ${title}`);
        });
    });

    test('Count of api test cases', { tag: ['@abc'] }, async ({ page }) => {
        await page.locator('button').filter({ hasText: 'APIs list for practice' }).first().click();
        await page.locator('.panel-title').first().waitFor();
        const TestCount = await page.locator('.panel-title').count();
        console.log("API testcase count =", TestCount);

    });

    test('should display "Logged in as Arati Kadam" after login', { tag: ['@abc'] }, async ({ page }) => {
        // The login steps are in beforeEach, so we can directly check the text
        await expect(page.getByText('Logged in as Arati Kadam', { exact: true })).toBeVisible();

    });


});
test('Add to cart product', { tag: ['@abc'] }, async ({ page }) => {
    await page.goto('https://automationexercise.com/');


    await page.locator("//a[@href='/products']").click();


    await page.locator("//a[@href='#Women']").click();


    await page.locator('span.badge.pull-right').first().click();


    await page.locator("a[href='/category_products/1']").click();


    await page.locator('a').filter({ hasText: 'Add to cart' }).first().click();

    await page.getByText('View Cart', { exact: true }).click();
    
});





