import { test, expect } from "../fixtures";
import { BasePage } from "../pages/BasePage";

test(
    "User submits support form and handles confirmation dialog",
    {
        tag: ["@regression", "@support"],
    },
    async ({ page }) => {
        const basePage = new BasePage(page, "/contact_us");

        await basePage.navigateTo();

        await expect(
            page.getByText("Get In Touch")
        ).toBeVisible();

        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("confirm");
            await dialog.accept();
        });

        await basePage.submitSupportForm(
            "Saradha",
            "saradha@example.com",
            "Test Support Request",
            "This is a test message for the support form."
        );

        await expect(
            page
                .locator("#contact-page")
                .getByText(
                    "Success! Your details have been submitted successfully."
                )
        ).toBeVisible();
    }
);