import { expect } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;

    this.userName = page.locator('app-profile').getByText(/Test Mock User|/);
    this.avatar = page.locator('app-profile img');
  }

  async open() {
    await this.page.goto('https://qauto.forstudy.space/panel/profile');
  }

  async expectUserName(name) {
    await expect(this.page.locator('app-profile')).toContainText(name);
  }

  async expectAvatar(filename) {
    await expect(this.avatar).toHaveAttribute('src', new RegExp(filename));
  }

  async expectAvatarVisible() {
    await expect(this.avatar).toBeVisible();
  }
}