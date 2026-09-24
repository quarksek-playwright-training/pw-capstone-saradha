import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SupportPage extends BasePage {
    constructor(page: Page) {
        super(page, "/contact_us");
    }

    private contactForm = this.page.locator("#contact-us-form");

    private nameInput = this.contactForm.getByPlaceholder("Name");

    private emailInput = this.contactForm.getByPlaceholder("Email");

    private subjectInput = this.contactForm.getByPlaceholder("Subject");

    private messageInput = this.contactForm.getByPlaceholder("Your Message");

    private submitButton = this.contactForm.getByRole("button", {
        name: "Submit",
    });

    async submitSupportForm(
        name: string,
        email: string,
        subject: string,
        message: string
    ) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        await this.submitButton.click();
    }
}