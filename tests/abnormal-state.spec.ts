import { test, expect } from "../fixtures";

// Adding comments
test(
    "Application handles Add to Cart request failure",
    {
        tag: ["@regression", "@cart", "@negative"],
    },
    async ({ page, productPage, cartPage }) => {

        const productName = "Men Tshirt";

        // Make sure this product is not already in the cart
        await cartPage.navigateTo();

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

        await productPage.navigateTo();
        await productPage.searchProduct(productName);

        await productPage.addProductToCart(productName);

        await cartPage.navigateTo();

        await expect(
            page
                .locator("#cart_info_table tbody tr")
                .filter({ hasText: productName })
        ).toHaveCount(0);
    }
);