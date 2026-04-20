export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    if (await this.page.getByRole('heading', { name: 'Garage' }).isVisible()) {
      return;
    }

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.getByRole('button', { name: /sign in/i }).click();

    await this.page.locator('#signinEmail').fill(email);
    await this.page.locator('#signinPassword').fill(password);

    await this.page.getByRole('button', { name: /login/i }).click();

    await this.page.getByRole('heading', { name: 'Garage' }).waitFor({ timeout: 10000 });
  }
}
