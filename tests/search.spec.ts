import { test, expect } from "../fixtures";
import { searchTerms } from "../test-data/searchTerm";

for (const searchTerm of searchTerms) {

    test(
        `Search returns only matching results for "${searchTerm}"`,
        {
            tag: ["@regression", "@search"],
        },
        async ({ productPage, page }) => {

        
            //await productPage.navigateTo();

    
            await productPage.searchProduct(searchTerm);

     
            const products = page.locator(".productinfo");

    
            await expect(products.first()).toBeVisible();

            const productCount = await products.count();
            console.log(`Number of products found: ${productCount}`);

            for (let i = 0; i < productCount; i++) {

                const product = products.nth(i);

                await expect(product).toContainText(searchTerm);
            }
        }
    );
}