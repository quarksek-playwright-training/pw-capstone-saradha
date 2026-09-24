import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";

type UserCredentials = {
    name: string;
    email: string;
    password: string;
    authFile: string;
};

const users: UserCredentials[] = [
    {
        name: "Test User1",
        email: "palsardarsh@gmail.com",
        password: "TN45bl@9561",
        authFile: ".auth/user1.json",
    },
    {
        name: "Test User 2",
        email: "palsardarsh+test9@gmail.com",
        password: "sara123",
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

        const loggedIn = page.getByText(/Logged in as/i);

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

            await expect(
                page.locator("[data-qa='account-created']")
            ).toBeVisible();

            await basePage.continueAfterSignup();
            await expect(
                page.getByText(/Logged in as/i)
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