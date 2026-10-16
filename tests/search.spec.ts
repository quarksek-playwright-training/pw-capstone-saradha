import { test, expect } from "../fixtures";
import { searchTerms } from "../test-data/searchTerm";

for (const searchTerm of searchTerms) {

    test(
        `Search returns only matching results for "${searchTerm}"`,
        {
            tag: ["@regression", "@search"],
        },
        async ({ productPage, page }) => {
            await productPage.searchProduct(searchTerm);

      const products = productPage.getProducts();
        await expect(products.first()).toBeVisible();

     const productCount = await productPage.getProductCount();
      console.log(`Number of products found: ${productCount}`);

     const productNames = await productPage.getProductNames();

    for (const productName of productNames) {
    expect(productName).toContain(searchTerm);
      }

        }
    );
}