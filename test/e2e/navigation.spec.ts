import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Inertia App/);
    await expect(page.locator('h1')).toContainText('Cloudflare Inertia App');

    // Navigate to About
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About');

    // Navigate to Users
    await page.click('a[href="/users"]');
    await expect(page).toHaveURL('/users');
    await expect(page.locator('h1')).toContainText('Users');

    // Navigate back to Home
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Cloudflare Inertia App');
  });

  test('should display user page', async ({ page }) => {
    await page.goto('/users');
    
    // Click on first user link
    await page.click('a[href="/users/1"]');
    await expect(page).toHaveURL('/users/1');
    await expect(page.locator('h1')).toContainText('User Profile');
  });

  test('should handle 404 for non-existent user', async ({ page }) => {
    const response = await page.goto('/users/999');
    expect(response?.status()).toBe(404);
  });
});