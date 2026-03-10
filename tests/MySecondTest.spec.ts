import { test, expect } from '@playwright/test';
import { login } from '../utils/loginUtil';

import dotenv from 'dotenv';
import { clear } from 'node:console';
dotenv.config({ quiet: true });
test.describe('Login Tests', () => { //Tc Added in describe group 

    //  test.use({ storageState: 'loginState.json' });
    test.beforeEach(async ({ page} , testInfo) => {
        //Add tag and only smoke tc added in cicd 
        if (testInfo.title === 'sign up error validation - Email Address already exist') {
            return; // skip beforeEach logic
        
        }
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
    
       
    test('test1 Print testcases name', { tag: ['@abc'] }, async ({ page }) => {

        // Click on Test Cases
        await page.locator('button', { hasText: 'Test Cases' }).first().click();
      
        // ✅ Safe wait – ensures page/UI is ready
        const header = page.locator('b', { hasText: 'TEST CASES' });
        await expect(header).toBeVisible({ timeout: 10000 });
      
        // ✅ Locator for testcase names
        const testcaseLocators = page.locator('h4.panel-title a u');
      
        const totalTestcases = await testcaseLocators.count();
        console.log('Total Testcases:', totalTestcases);
      
        for (let i = 0; i < totalTestcases; i++) {
          const testcaseName = await testcaseLocators.nth(i).innerText();
          console.log(`Testcase ${i + 1}: ${testcaseName.trim()}`);
        }
      
        // ✅ Assertion
        expect.soft(totalTestcases).toBeGreaterThan(20);
       });

    
    test('Print All api name', { tag: ['@abc'] }, async ({ page }) => {
        await page.locator('button').filter({ hasText: 'APIs list for practice' }).first().click();
        await page.locator('.panel-title').first().waitFor();
        const PanelTitles = await page.locator('.panel-title').allTextContents();
        console.log('All Test Case Names:');
        
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


 test('Add to cart product', { tag: ['@abc'] }, async ({ page }) => {

    await page.locator("//a[@href='/products']").click();


    await page.locator("//a[@href='#Women']").click();


    await page.locator('span.badge.pull-right').first().click();


    await page.locator("a[href='/category_products/1']").click();


    await page.locator('a').filter({ hasText: 'Add to cart' }).first().click();

    await page.getByText('View Cart', { exact: true }).click();
 });
test('verify product name in cart', { tag: ['@abc'] }, async ({ page }) => {
    // Go to home page (done by beforeEach login)
    // Navigate to Cart page
    await page.getByRole('link', { name: 'Cart' }).click();

    // Wait for cart table/list to be visible
    await page.locator('.cart_info').waitFor();

    // Locate product name in cart - adjust selector as needed for actual cart row
    const productNameLocator = page.locator('.cart_description .product_name, .cart_info .cart_description h4 a, .cart_info .cart_description .heading a'); // Try possible selectors

    // Ensure at least one product in cart
    await expect(productNameLocator.first()).toBeVisible({ timeout: 5000 });

    // Get product name from cart
    const productName = await productNameLocator.first().innerText();

    console.log('Product name in cart:', productName);

    // Assert product name not empty
    expect(productName.trim().length).toBeGreaterThan(0);
});

test('verify cart product price', { tag: ['@abc'] }, async ({ page }) => {
    // Go to Cart page
    await page.getByRole('link', { name: 'Cart' }).click();

    // Wait for cart info to display
    await page.locator('.cart_info').waitFor();

    // Locate price element(s) for the first product in cart
    const productPriceLocator = page.locator('.cart_total .cart_total_price, .cart_price p, .cart_info .cart_price .heading, .cart_info .cart_price p'); // Try selectors per cart row

    // Ensure price is visible
    await expect(productPriceLocator.first()).toBeVisible({ timeout: 5000 });

    // Extract the price text
    const productPrice = await productPriceLocator.first().innerText();

    console.log('Product price in cart:', productPrice);

    // Assert price follows a price pattern, e.g., "$" or number
    expect(productPrice.trim()).toMatch(/\d/);
});
test('sign up error validation - Email Address already exist', {tag : ['@abc']}, async ({ page }) => {
await page.goto('/');

    // Click on 'Signup / Login' link
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Fill in the Name field
    await page.getByRole('textbox', { name: 'Name' }).fill('arati');

    // Fill in the Email Address field (nth(2) after form)
    await page.locator("//input[@data-qa='signup-email']").fill("arati5april@gmail.com");

    // Click on 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click();

    // Expect an error message regarding existing email
    // The selector for error may be like: "Email Address already exist!"
    const errorMessage = page.getByText('Email Address already exist!');
   
    await expect(errorMessage).toBeVisible();
 });

//  test('verify boolean after new signup  ', { tag: ['@abc'] }, async ({ page }) => {
// await page.goto('/')

//  // Click on 'Signup / Login' link to go to the registration form
//  await page.getByRole('link', { name: 'Signup / Login' }).click();

// await page.getByRole('textbox', { name: 'Name' }).click()
// await page.getByRole('textbox', { name: 'Name' }).fill("arati")
// await page.locator("//input[@data-qa='signup-email']").fill("aratichavhanke05@gmail.com")

// await page.getByRole('button', { name: 'Signup' }).click()

//     // Locate the 'Mr.' radio button
//     const mrRadio = page.getByRole('radio', { name: 'Mr.' });

//     // Check the boolean value for 'selected'
//     const isSelected = await mrRadio.isChecked();

//     // Assert the radio button is not selected
//     expect(isSelected).toBe(false);

//     // Optionally, log for clarity during test runs
//     console.log('Is "Mr." radio button selected?', isSelected);


 });
    

