export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userMenuButton = page.locator('#userNavDropdown');
    this.logoutButton = page.locator('.dropdown-item', { hasText: 'Logout' });
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

  async logout() {
    await this.userMenuButton.click();
    await this.logoutButton.click();
    await this.page.getByRole('button', { name: /sign in/i }).waitFor({ timeout: 10000 });
  }
}
