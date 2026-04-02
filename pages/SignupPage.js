export class SignupPage {
  constructor(page) {
    this.page = page;
    this.modal = page.locator("ngb-modal-window");
  }

  registrationModal() {
    return this.page.locator("ngb-modal-window.show");
  }

  async openSignup() {
    await this.page.getByText("Sign In").click();
    await this.modal.waitFor();

    await this.page.locator('ngb-modal-window.show .modal-footer .btn-link').click();
    await this.registrationModal().waitFor();
  }

  async openRegistrationViaSignIn() {
    await this.page.getByText("Sign In").click({ force: true });
    await this.modal.waitFor();

    await this.modal.getByText("Registration").click();
    await this.registrationModal().waitFor();
  }

  async closeModal() {
    await this.registrationModal()
      .locator(".close span")
      .click({ force: true });
  }

  nameInput() {
    return this.registrationModal().locator('[name="name"]');
  }

  lastNameInput() {
    return this.registrationModal().locator('[name="lastName"]');
  }

  emailInput() {
    return this.registrationModal().locator('[name="email"]');
  }

  passwordInput() {
    return this.registrationModal().locator('[name="password"]');
  }

  repeatPasswordInput() {
    return this.registrationModal().locator("#signupRepeatPassword");
  }

  async fillForm(user) {
    await this.nameInput().fill(user.name);
    await this.lastNameInput().fill(user.lastName);
    await this.emailInput().fill(user.email);
    await this.passwordInput().fill(user.password);
    await this.repeatPasswordInput().fill(user.password);
  }

  async submit() {
    const btn = this.registrationModal().getByRole("button", {
      name: "Register",
    });
    await btn.waitFor();
    await btn.click();
  }

  async triggerNameRequired() {
    await this.nameInput().click();
    await this.lastNameInput().click();
  }

  async triggerNameInvalid() {
    await this.nameInput().fill("1");
    await this.lastNameInput().click();
  }

  async triggerNameTooShort() {
    await this.nameInput().fill("A");
    await this.lastNameInput().click();
  }

  async triggerLastNameRequired() {
    await this.lastNameInput().click();
    await this.nameInput().click();
  }

  async triggerLastNameInvalid() {
    await this.lastNameInput().fill("1");
    await this.nameInput().click();
  }

  async triggerLastNameTooShort() {
    await this.lastNameInput().fill("A");
    await this.nameInput().click();
  }

  async triggerEmailRequired() {
    await this.emailInput().click();
    await this.passwordInput().click();
  }

  async triggerEmailInvalid() {
    await this.emailInput().fill("wrongemail");
    await this.passwordInput().click();
  }

  async triggerPasswordRequired() {
    await this.passwordInput().click();
    await this.repeatPasswordInput().click();
  }

  async triggerPasswordTooShort() {
    await this.passwordInput().fill("123");
    await this.repeatPasswordInput().click();
  }

  async triggerPasswordWeak() {
    await this.passwordInput().fill("password");
    await this.repeatPasswordInput().click();
  }

  async triggerRepeatPasswordRequired() {
    await this.repeatPasswordInput().fill("123");
    await this.repeatPasswordInput().fill("");
    await this.passwordInput().click();
  }

  async triggerPasswordMismatch() {
    await this.passwordInput().fill("Password123");
    await this.repeatPasswordInput().fill("wrong");
    await this.passwordInput().click();
  }

  error(text) {
    return this.registrationModal().getByText(text);
  }
}
