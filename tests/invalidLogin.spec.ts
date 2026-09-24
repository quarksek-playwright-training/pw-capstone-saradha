import { test, expect } from '../fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test(
    'User cannot login with incorrect password',
    {
        tag: ['@regression', '@auth', '@negative'],
    },
    async ({ loginPage, page }) => {

        await loginPage.navigateTo();

        await loginPage.login(
            'palsardarsh@gmail.com',
            'IncorrectPassword123'
        );
        await expect(
            page.getByText('Your email or password is incorrect!')
        ).toBeVisible();
    }
);