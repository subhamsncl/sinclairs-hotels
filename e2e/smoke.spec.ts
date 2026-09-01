import { expect, test } from '@playwright/test';

test('home page loads and shows the hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('nav links to hotels listing and it renders property cards', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Hotels', exact: true }).first().click();
  await expect(page).toHaveURL(/\/hotels$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('enquiry form is reachable and rejects an empty submission', async ({ page }) => {
  await page.goto('/enquiry');
  await page.getByRole('button', { name: /send enquiry/i }).click();
  await expect(page.getByLabel('Full Name')).toHaveJSProperty('validity.valid', false);
});
