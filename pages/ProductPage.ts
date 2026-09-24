import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

    constructor(page: Page) {
        super(page, "/products");
    }

    private searchInput =
        this.page.getByPlaceholder("Search Product");

    private  searchButton =
        this.page.locator("#submit_search");

    async searchProduct(productName: string) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async addProductToCart(productName: string) {
        const addToCartButton = this.page.locator(
            `//div[contains(@class,'productinfo')]//p[normalize-space()='${productName}']/following-sibling::a[contains(@class,'add-to-cart')]`
        );

        await addToCartButton.click();
    }
}