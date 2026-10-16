import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";
import "dotenv/config";

type UserCredentials = {
    name: string;
    email: string;
    password: string;
    authFile: string;
};

const users: UserCredentials[] = [
    {
        name: process.env.PERSISTENT_USER_NAME!,
        email: process.env.PERSISTENT_USER_EMAIL!,
        password: process.env.PERSISTENT_USER_PASSWORD!,
        authFile: ".auth/user1.json",
    },
    {
        name: process.env.USER2_NAME!,
        email: process.env.USER2_EMAIL!,
        password: process.env.USER2_PASSWORD!,
        authFile: ".auth/user2.json",
    },
];

for (const user of users) {
    setup(`Authenticate ${user.name}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page, "/");
        await loginPage.navigateTo();

        await loginPage.login(
            user.email,
            user.password
        );
        const loggedIn = basePage.loggedInLabel;

        if (await loggedIn.isVisible().catch(() => false)) {

            console.log(
                `${user.name} already exists. Login successful.`
            );

        } else {

            await basePage.signup(
                user.name,
                user.email,
                user.password
            );

           await expect(basePage.accountCreatedMessage).toBeVisible();

            await basePage.continueAfterSignup();
            await expect(
               basePage.loggedInLabel
            ).toBeVisible();

            console.log(
                `${user.name} was created and logged in successfully.`
            );
        }
        await page.context().storageState({
            path: user.authFile,
        });

        console.log(
            `Storage state saved to ${user.authFile}`
        );
    });
}