import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page, "/view_cart");
    }

    private cartRows = this.page.locator("#cart_info_table tbody tr");

    private emptyCartMessage = this.page.getByText(
        "Cart is empty! Click here to buy products."
    );

    async getProductNames(): Promise<string[]> {
        return await this.cartRows
            .locator(".cart_description h4 a")
            .allTextContents();
    }

    // async getProductPrice(productName: string): Promise<string> {
    //     const productRow = this.cartRows.filter({
    //         hasText: productName,
    //     });

    //     return await productRow
    //         .locator(".cart_price")
    //         .innerText();
    // }

    async getProductPrice(productName: string): Promise<string> {
        const productPrice = this.page.locator(
            `//table[@id='cart_info_table']//tr[.//h4/a[normalize-space()='${productName}']]//td[contains(@class,'cart_price')]`
        );

        return await productPrice.innerText();
    }
    async removeProduct(productName: string): Promise<void> {
        const productRow = this.cartRows.filter({
            hasText: productName,
        });

        await productRow
            .locator(".cart_quantity_delete")
            .click();

        await this.page.waitForTimeout(1000);
    }

    async isProductInCart(productName: string): Promise<boolean> {
        const productRow = this.cartRows.filter({
            hasText: productName,
        });

        return await productRow.count() > 0;
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.emptyCartMessage.isVisible();
    }
}