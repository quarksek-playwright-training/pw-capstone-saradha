import { test, expect } from '../fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test(
    'User logs in', {tag: ['@smoke', '@auth'],},
    async ({ loginPage, page}) => {
        await loginPage.navigateTo();
        const email = process.env.PERSISTENT_USER_EMAIL!;
        const password = process.env.PERSISTENT_USER_PASSWORD!;

    await loginPage.login(
       email, password
    );

  await expect(loginPage.loginSuccessMessage).toBeVisible();
  console.log('User successfully logged in');

    }
);
