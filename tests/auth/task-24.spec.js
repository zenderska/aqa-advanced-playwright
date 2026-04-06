import { test, expect } from '@playwright/test';
import { SignupPage } from '../../pages/SignupPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Auth (POM) - Registration vs Validation', () => {
  let signupPage;
  let loginPage;

  const validUser = {
    name: 'John',
    lastName: 'Doe',
    email: '-geresat_aqa_765+@test.com',
    password: 'Password123',
  };

  const generateUser = () => ({
    name: 'John',
    lastName: 'Doe',
    email: `-mrc622_aqa_${Date.now()}@test.com`,
    password: 'Password123',
  });

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    loginPage = new LoginPage(page);
    await page.goto('/');
  });

  test('Should register or login if user exists', async () => {
    await signupPage.openSignup();
    await signupPage.registerOrLogin(validUser, loginPage);
  });

  test('Should register successfully with dynamic email', async () => {
    const user = generateUser();
    await signupPage.openSignup();
    await signupPage.registerOrLogin(user, loginPage);
  });

  test.describe('Registration Modal - Validation tests', () => {
    test.beforeEach(async () => {
      await signupPage.openRegistrationViaSignIn();
    });

    test.afterEach(async () => {
      await signupPage.closeModal();
    });

     test('Name - required', async () => {
    await signupPage.registrationModal().locator('[name="name"]').click();
    await signupPage.registrationModal().locator('[name="lastName"]').click();
    await expect(signupPage.registrationModal().getByText('Name required')).toBeVisible();
  });

  test('Name - invalid characters', async () => {
    await signupPage.registrationModal().locator('[name="name"]').fill('1');
    await signupPage.registrationModal().locator('[name="lastName"]').click();
    await expect(signupPage.registrationModal().getByText('Name is invalid')).toBeVisible();
  });

  test('Name - too short', async () => {
    await signupPage.registrationModal().locator('[name="name"]').fill('A');
    await signupPage.registrationModal().locator('[name="lastName"]').click();
    await expect(signupPage.registrationModal().getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  });

  test('Last Name - required', async () => {
    await signupPage.registrationModal().locator('[name="lastName"]').click();
    await signupPage.registrationModal().locator('[name="name"]').click();
    await expect(signupPage.registrationModal().getByText('Last name required')).toBeVisible();
  });

  test('Last Name - invalid characters', async () => {
    await signupPage.registrationModal().locator('[name="lastName"]').fill('1');
    await signupPage.registrationModal().locator('[name="name"]').click();
    await expect(signupPage.registrationModal().getByText('Last name is invalid')).toBeVisible();
  });

  test('Last Name - too short', async () => {
    await signupPage.registrationModal().locator('[name="lastName"]').fill('A');
    await signupPage.registrationModal().locator('[name="name"]').click();
    await expect(signupPage.registrationModal().getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
  });

  test('Email - required', async () => {
    await signupPage.registrationModal().locator('[name="email"]').click();
    await signupPage.registrationModal().locator('[name="password"]').click();
    await expect(signupPage.registrationModal().getByText('Email required')).toBeVisible();
  });

  test('Email - invalid format', async () => {
    await signupPage.registrationModal().locator('[name="email"]').fill('wrongemail');
    await signupPage.registrationModal().locator('[name="password"]').click();
    await expect(signupPage.registrationModal().getByText('Email is incorrect')).toBeVisible();
  });

  test('Password - required', async () => {
    await signupPage.registrationModal().locator('[name="password"]').click();
    await signupPage.registrationModal().locator('#signupRepeatPassword').click();
    await expect(signupPage.registrationModal().getByText('Password required')).toBeVisible();
  });

  test('Password - too short', async () => {
    await signupPage.registrationModal().locator('[name="password"]').fill('123');
    await signupPage.registrationModal().locator('#signupRepeatPassword').click();
    await expect(signupPage.registrationModal().getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  });

  test('Password - weak', async () => {
    await signupPage.registrationModal().locator('[name="password"]').fill('password');
    await signupPage.registrationModal().locator('#signupRepeatPassword').click();
    await expect(signupPage.registrationModal().getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  });

  test('Repeat Password - required', async () => {
    await signupPage.registrationModal().locator('#signupRepeatPassword').fill('123');
    await signupPage.registrationModal().locator('#signupRepeatPassword').fill('');
    await signupPage.registrationModal().locator('[name="password"]').click();
    await expect(signupPage.registrationModal().getByText('Re-enter password required')).toBeVisible();
  });

  test('Repeat Password - mismatch', async () => {
    await signupPage.registrationModal().locator('[name="password"]').fill('Password123');
    await signupPage.registrationModal().locator('#signupRepeatPassword').fill('wrong');
    await signupPage.registrationModal().locator('[name="password"]').click();
    await expect(signupPage.registrationModal().getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  });
});
  });