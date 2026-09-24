import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page, "/login");
    }

    private usernameInput =
        this.page.locator("[data-qa='login-email']");

    private  passwordInput =
        this.page.locator("[data-qa='login-password']");

    private loginButton =
        this.page.getByRole("button", { name: "Login" });

    async login(email: string, password: string) {
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}