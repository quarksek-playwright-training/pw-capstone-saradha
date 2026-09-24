import { test, expect } from "../fixtures";
import { searchTerms } from "../test-data/searchTerm";

for (const searchTerm of searchTerms) {

    test(
        `Search returns only matching results for "${searchTerm}"`,
        {
            tag: ["@regression", "@search"],
        },
        async ({ productPage, page }) => {

            // Open Products page
            await productPage.navigateTo();

            // Search using the data-driven search term
            await productPage.searchProduct(searchTerm);

            // Get all products displayed after the search
            const products = page.locator(".productinfo");

            // At least one matching product should be displayed
            await expect(products.first()).toBeVisible();

            const productCount = await products.count();

            for (let i = 0; i < productCount; i++) {

                const product = products.nth(i);

                await expect(product).toContainText(searchTerm);
            }
        }
    );
}