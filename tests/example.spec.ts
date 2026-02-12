import { test, expect } from '@playwright/test';

test.describe('Learning', () => {

  test('has title', { tag: ['@regression'] }, async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.waitForTimeout(2000)
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', { tag: ['@smoke'] }, async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.waitForTimeout(2000)
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('Arati test ', { tag: ['@smoke'] }, async ({ page }) => {
    await page.goto('https://playwright.dev/');

    const logo = await page.getByRole('link', { name: 'GitHub repository' }).isVisible();
    await expect(logo).toBeTruthy();
    await page.waitForTimeout(2000)

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('navigate to google.com and verify Gmail text is present',  { tag: ['@regression'] }, async ({ page }) => {
    await page.goto('https://www.google.com');
    const gmailLink = page.getByRole('link', { name: 'Gmail' });
    await expect(gmailLink).toBeVisible();
    await page.waitForTimeout(2000)
    // Assert that the text 'Gmail' is present somewhere in the page
    await expect(gmailLink).toHaveText('Gmail');
  });

  test('check visibility of important links on testautomationpractice.blogspot.com',  { tag: ['@smoke'] }, async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');  
    const homeLink = page.getByRole('link', { name: /home/i }).first()
    await expect(homeLink).toBeVisible();
    await page.waitForTimeout(2000)

    const udemyCoursesLink = page.getByRole('link', { name: /Udemy Courses/i }).first();
    await expect(udemyCoursesLink).toBeVisible();

    const onlineTrainingsLink = page.getByRole('link', { name: /online trainings/i }).first();
    await expect(onlineTrainingsLink).toBeVisible();

    const blogLink = page.getByRole('link', { name: /blog/i }).first();


    const playwrightPracticeLink = page.getByRole('link', { name: /playwrightPractice/i }).first();
    await expect(playwrightPracticeLink).toBeVisible();
  })



  test('navigate to Blog and check SDET-QA Blog link and URL', { tag: ['@smoke'] }, async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    // Click on the 'Blog' link
    const blogLink = page.getByRole('link', { name: /blog/i }).first();
    await expect(blogLink).toBeVisible();
    await blogLink.click();
    await page.waitForTimeout(3000);

    // Find the "SDET-QA Blog" link
    const sdetQaBlogLink = page.getByRole('link', { name: /SDET-QA Blog/i }).first();
    await expect(sdetQaBlogLink).toBeVisible();
    
    // // Click the "SDET-QA Blog" link
    // const [newPage] = await Promise.all([
    //   page.context().waitForEvent('page'),
    //   sdetQaBlogLink.click()
    // ]);

    // // Wait until the new page is loaded and check the URL
    // await newPage.waitForLoadState('domcontentloaded');
    // await expect(newPage).toHaveURL('https://www.pavantestingtools.com/');
    // await newPage.close();
  })

  test('Udemy Courses: check course tile count',  { tag: ['@regression'] }, async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    // Click on the 'Udemy Courses' link
    const udemyCoursesLink = page.getByRole('link', { name: /Udemy Courses/i }).first();
    await expect(udemyCoursesLink).toBeVisible();
    await udemyCoursesLink.click();
    await page.waitForTimeout(2000);

    // Find all course tiles using the selector ".course"
    const courseTiles = page.locator('.course');
    const count = await courseTiles.count();

    // Check that at least one course tile is present
    console.log('the count of cource is :',count)
    expect(count).toBeGreaterThan(0);
  })
});