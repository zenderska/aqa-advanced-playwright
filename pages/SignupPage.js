import { expect } from "@playwright/test";

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.modal = page.locator("ngb-modal-window");
  }

  async openRegistrationViaSignIn() {
    await this.page.getByText("Sign In").click({ force: true });
    await this.modal.waitFor();
    await this.modal.getByText("Registration").click();
    await this.registrationModal().waitFor();
  }

  registrationModal() {
    return this.page.locator("ngb-modal-window.show");
  }

  async openSignup() {
    await this.page.getByText("Sign In").click();
    await this.modal.waitFor();

    await this.page
      .locator("ngb-modal-window.show .modal-footer .btn-link")
      .click();
    await this.registrationModal().waitFor();
  }

  async fillForm(user) {
    await this.registrationModal().locator('[name="name"]').fill(user.name);
    await this.registrationModal()
      .locator('[name="lastName"]')
      .fill(user.lastName);
    await this.registrationModal().locator('[name="email"]').fill(user.email);
    await this.registrationModal()
      .locator('[name="password"]')
      .fill(user.password);
    await this.registrationModal()
      .locator("#signupRepeatPassword")
      .fill(user.password);
  }

  async submit() {
    const btn = this.registrationModal().getByRole("button", {
      name: "Register",
    });
    await btn.click();
  }

  async closeModal() {
    try {
      await this.registrationModal()
        .locator(".close span")
        .click({ force: true });
    } catch (e) {}
  }

  async registerOrLogin(user, loginPage) {
    const responsePromise = this.page.waitForResponse(
      (resp) =>
        resp.url().includes("/api/auth/signup") &&
        resp.request().method() === "POST",
    );

    await this.fillForm(user);
    await this.submit();

    const response = await responsePromise;

    if (response.status() === 201) {
      await this.page.waitForURL(/.*panel/);
    }

    if (response.status() === 400) {
      await this.closeModal();
      await loginPage.login(user.email, user.password);
      await expect(this.page).toHaveURL(/\/panel/);
    }
  }
}
