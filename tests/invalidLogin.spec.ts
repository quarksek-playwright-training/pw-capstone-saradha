import { test, expect } from '../fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test(
    'User cannot login with incorrect password',
    {
        tag: ['@regression', '@auth', '@negative'],
    },
    async ({ loginPage, page }) => {

        await loginPage.navigateTo();
        const email = process.env.PERSISTENT_USER_EMAIL!;
        const incorrectPassword = process.env.INCORRECT_PASSWORD!;

        await loginPage.login( email, incorrectPassword);
        
        await expect( loginPage.loginErrorMessage).toBeVisible();
    }
);