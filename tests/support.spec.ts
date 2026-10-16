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
            basePage.getInTouchLabel
        ).toBeVisible();

        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("confirm");
            await dialog.accept();
        });

        await basePage.submitSupportForm(
             process.env.SUPPORT_NAME!,
             process.env.SUPPORT_EMAIL!,
             process.env.SUPPORT_SUBJECT!,
             process.env.SUPPORT_MESSAGE!
);

        await expect(
            basePage.successMessage
        ).toBeVisible();
    }
);