import { test, expect } from "../fixtures";
import { productName } from "../test-data/searchTerm";

// Adding comments
test(
    "Application handles Add to Cart request failure",
    {
        tag: ["@regression", "@cart", "@negative"],
    },
    async ({ page, productPage, cartPage }) => {

        // const productName = "Men Tshirt";
          await productPage.searchProduct(productName);

        //await cartPage.navigateTo();

        if (await cartPage.isProductInCart(productName)) {
            await cartPage.removeProduct(productName);
            await cartPage.navigateTo();
        }

        await page.route(
            "**/add_to_cart/**",
            async (route) => {
                await route.abort("failed");
            }
        );

        //await productPage.navigateTo();
        await productPage.searchProduct(productName);

        await productPage.addProductToCart(productName);
        await expect(productPage.addedMessage).toBeHidden();
        console.log("Products are not added to the cart due to request failure")

        //await cartPage.navigateTo();


        await expect(cartPage.tableRows.filter({ hasText: productName })).toHaveCount(0);
    }
);