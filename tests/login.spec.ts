import { test, expect } from '../fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test(
    'User logs in', {tag: ['@smoke', '@auth'],},
    async ({ loginPage, page }) => {
        await loginPage.navigateTo();

    await loginPage.login(
        'palsardarsh@gmail.com',
        'TN45bl@9561'
    );

    await expect(page.getByText(/Logged in as/i)).toBeVisible();

});
