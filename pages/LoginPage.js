import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async login(email, password) {
  await this.page.getByText('Sign In').click();

  await this.page.locator('#signinEmail').fill(email);
  await this.page.locator('#signinPassword').fill(password);

  await this.page.getByText('Login').click();
}
}