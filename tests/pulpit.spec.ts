import { test, expect } from "@playwright/test";

test.describe("Transaction succesfull", () => {
  test("test", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("TESTER33");
    await page.getByTestId("password-input").fill("12345ADS");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("3000");
    await page.locator("#widget_1_transfer_title").fill("ZAKUP");
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByText("Przelew wykonany", { exact: true }).click();
    await page.getByTestId("close-button").click();

    await expect(
      page.getByRole("link", { name: "Przelew wykonany! Chuck" })
    ).toHaveText("Przelew wykonany! Chuck Demobankowy - 3000,00PLN - ZAKUP");
  });
});
