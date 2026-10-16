
import { test, expect } from "../fixtures";
import { productName } from "../test-data/searchTerm";

test(
    "User can add a product to cart and verify price using API",
    {
        tag: ["@smoke", "@cart"],
    },
    async ({ productPage, cartPage, page, request }) => {

        //const productName = "Blue Top";
        
        await productPage.searchProduct(productName);

        await productPage.addProductToCart(productName);

        await expect(productPage.addedMessage).toBeVisible();

        await productPage.viewCartLink.click();

        
        const productNames = await cartPage.getProductNames();

        expect(productNames).toContain(productName);

        const uiPrice = await cartPage.getProductPrice(productName);
        console.log(`UI Price for ${productName}:`, uiPrice);

        expect(uiPrice).toBeTruthy();
        const response = await request.get("/api/productsList");

        expect(response.ok()).toBeTruthy();

        const data = await response.json();
        const apiProduct = data.products.find(
            (product: { name: string }) =>
                product.name === productName
        );

        expect(apiProduct).toBeDefined();

        const apiPrice = apiProduct.price;
        console.log(`API Price for ${productName}:`, apiPrice);

        expect(uiPrice).toBe(apiPrice);

        await cartPage.removeProduct(productName);
    }
);
