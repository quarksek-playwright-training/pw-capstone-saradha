import { test, expect } from "@playwright/test";

test(
    "Cart state is isolated between two users",
    {
        tag: ["@regression", "@cart"],
    },
    async ({ browser }) => {

        //User 1 context
        const user1Context = await browser.newContext({
            storageState: ".auth/user1.json",
        });

        const user1Page = await user1Context.newPage();

        await user1Page.goto("/view_cart", {
    waitUntil: "domcontentloaded",
});

        const user1Products = user1Page.locator(
            ".cart_description h4 a"
        );
        while (await user1Products.count() > 0) {
            await user1Page
                .locator(".cart_quantity_delete")
                .first()
                .click();

            await expect(
                user1Products.first()
            ).toBeHidden();
        }

        await expect(user1Products).toHaveCount(0);
        //User 2 context
        const user2Context = await browser.newContext({
            storageState: ".auth/user2.json",
        });

        const user2Page = await user2Context.newPage();

       await user2Page.goto("/products", {
    waitUntil: "domcontentloaded",
});

        await user2Page
            .getByPlaceholder("Search Product")
            .fill("Blue Top");

        await user2Page
            .locator("#submit_search")
            .click();
        const blueTopAddButton = user2Page.locator(
            `//div[contains(@class,'productinfo')]//p[normalize-space()='Blue Top']/following-sibling::a[contains(@class,'add-to-cart')]`
        );

        await blueTopAddButton.click();

        await expect(
            user2Page.getByText("Added!")
        ).toBeVisible();

        await user2Page.getByText("View Cart").click();

        const user2Products = user2Page.locator(
            ".cart_description h4 a"
        );

        await expect(user2Products).toContainText("Blue Top");

        await user1Page.goto("/view_cart", {
    waitUntil: "domcontentloaded",
});

        await expect(user1Products).toHaveCount(0);

        await user2Page
            .locator(".cart_quantity_delete")
            .first()
            .click();

        await expect(user2Products).toHaveCount(0);
        await user1Context.close();
        await user2Context.close();
    }
);