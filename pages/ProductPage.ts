import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

    constructor(page: Page) {
        super(page, "/products");
    }

    // Search locators
    private searchInput =
        this.page.getByPlaceholder("Search Product");

    private searchButton =
        this.page.locator("#submit_search");

    // Search result locator
    private products: Locator =
        this.page.locator(".productinfo");

         addedMessage = this.page.getByText("Added!");
         viewCartLink = this.page.getByRole("link", { name: "View Cart" });


    // Search for a product
    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    // Get the number of product containers
    async getProductCount(): Promise<number> {
        return await this.products.count();
    }

    // Get product names from the search results
    async getProductNames(): Promise<string[]> {
        return await this.products
            .locator("p")
            .allTextContents();
    }

    // Get the product locator for assertions
    getProducts(): Locator {
        return this.products;
    }

    // Add a specific product to the cart
    async addProductToCart(productName: string): Promise<void> {
        const addToCartButton = this.page.locator(
            `//div[contains(@class,'productinfo')]//p[normalize-space()='${productName}']/following-sibling::a[contains(@class,'add-to-cart')]`
        );

        await addToCartButton.click();
    }
}
