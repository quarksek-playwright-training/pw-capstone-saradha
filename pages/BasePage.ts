import { Page } from "@playwright/test";

export class BasePage {
    constructor(
        protected readonly page: Page,
        private readonly path: string
    ) {}

    async navigateTo() {
        await this.page.goto(this.path, {
            waitUntil: "domcontentloaded",
        });
    }
    

    // Support form
    async submitSupportForm(
        name: string,
        email: string,
        subject: string,
        message: string
    ) {
        const contactForm = this.page.locator("#contact-us-form");

        await contactForm
            .getByPlaceholder("Name")
            .fill(name);

        await contactForm
            .getByPlaceholder("Email")
            .fill(email);

        await contactForm
            .getByPlaceholder("Subject")
            .fill(subject);

        await contactForm
            .getByPlaceholder("Your Message")
            .fill(message);

        await contactForm
            .getByRole("button", { name: "Submit" })
            .click();
    }

    // Signup / Registration
    async signup(
        name: string,
        email: string,
        password: string
    ) {
        // Open Signup / Login
        await this.page
            .getByRole("link", { name: "Signup / Login" })
            .click();

        // Enter signup details
        await this.page
            .getByPlaceholder("Name")
            .fill(name);

        await this.page
            .getByPlaceholder("Email Address")
            .nth(1)
            .fill(email);

        await this.page
            .getByRole("button", { name: "Signup" })
            .click();

        // Account Information
        await this.page
            .locator("#id_gender1")
            .check();

        await this.page
            .locator("[data-qa='password']")
            .fill(password);

        // Date of Birth
        await this.page
            .locator("#days")
            .selectOption("10");

        await this.page
            .locator("#months")
            .selectOption("5");

        await this.page
            .locator("#years")
            .selectOption("1990");

        // Address Information
        await this.page
            .locator("[data-qa='first_name']")
            .fill(name);

        await this.page
            .locator("[data-qa='last_name']")
            .fill("Test");

        await this.page
            .locator("[data-qa='address']")
            .fill("Test Address");

        await this.page
            .locator("[data-qa='country']")
            .selectOption({ label: "India" });

        await this.page
            .locator("[data-qa='state']")
            .fill("Tamil Nadu");

        await this.page
            .locator("[data-qa='city']")
            .fill("Hosur");

        await this.page
            .locator("[data-qa='zipcode']")
            .fill("635109");

        await this.page
            .locator("[data-qa='mobile_number']")
            .fill("9876543210");

        // Create account
        await this.page
            .locator("[data-qa='create-account']")
            .click();
    }

    async continueAfterSignup() {
        await this.page
            .locator("[data-qa='continue-button']")
            .click();
    }
}