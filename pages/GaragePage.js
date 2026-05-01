export class GaragePage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('h1');
    this.userMenuButton = page.locator('#userNavDropdown');
    this.logoutButton = page.locator('.dropdown-item', { hasText: 'Logout' });
  }

  async open() {
    await this.page.goto('/panel/garage');
  }

  async logout() {
    await this.userMenuButton.click();
    await this.logoutButton.click();
  }
}