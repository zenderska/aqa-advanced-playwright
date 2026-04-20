export class GaragePage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('h1');
  }

  async open() {
    await this.page.goto('/panel/garage');
  }
}