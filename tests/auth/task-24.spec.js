import { test, expect } from '@playwright/test';
import { SignupPage } from '../../pages/SignupPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Registration & Authorization', () => {
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

  const registerOrLogin = async (page, user) => {
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/auth/signup') && resp.request().method() === 'POST'
    );

    await signupPage.fillForm(user);
    await signupPage.submit();

    const response = await responsePromise;

    if (response.status() === 201) {
      await page.waitForURL(/.*panel/);
    }

    if (response.status() === 400) {
      await signupPage.closeModal();
      await loginPage.login(user.email, user.password);
      await expect(page).toHaveURL(/\/panel/);
    }
  };

  test('Should register or login if user already exists', async ({ page }) => {
    await signupPage.openSignup();
    await registerOrLogin(page, validUser);
  });

  test('Should register successfully with dynamic email', async ({ page }) => {
    await signupPage.openSignup();
    await registerOrLogin(page, generateUser());
  });

  test.describe('Registration Modal - Validation tests', () => {

    test.beforeEach(async () => {
      await signupPage.openRegistrationViaSignIn();
    });

    test.afterEach(async () => {
      await signupPage.closeModal();
    });

    test('Name - required', async () => {
      await signupPage.triggerNameRequired();
      await expect(signupPage.error('Name required')).toBeVisible({ timeout: 5000 });
    });

    test('Name - invalid characters', async () => {
      await signupPage.triggerNameInvalid();
      await expect(signupPage.error('Name is invalid')).toBeVisible();
    });

    test('Name - too short', async () => {
      await signupPage.triggerNameTooShort();
      await expect(
        signupPage.error('Name has to be from 2 to 20 characters long')
      ).toBeVisible();
    });

    test('Last Name - required', async () => {
      await signupPage.triggerLastNameRequired();
      await expect(signupPage.error('Last name required')).toBeVisible();
    });

    test('Last Name - invalid characters', async () => {
      await signupPage.triggerLastNameInvalid();
      await expect(signupPage.error('Last name is invalid')).toBeVisible();
    });

    test('Last Name - too short', async () => {
      await signupPage.triggerLastNameTooShort();
      await expect(
        signupPage.error('Last name has to be from 2 to 20 characters long')
      ).toBeVisible();
    });

    test('Email - required', async () => {
      await signupPage.triggerEmailRequired();
      await expect(signupPage.error('Email required')).toBeVisible();
    });

    test('Email - invalid format', async () => {
      await signupPage.triggerEmailInvalid();
      await expect(signupPage.error('Email is incorrect')).toBeVisible();
    });

    test('Password - required', async () => {
      await signupPage.triggerPasswordRequired();
      await expect(signupPage.error('Password required')).toBeVisible();
    });

    test('Password - invalid (too short)', async () => {
      await signupPage.triggerPasswordTooShort();
      await expect(
        signupPage.error(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        )
      ).toBeVisible();
    });

    test('Password - invalid (weak)', async () => {
      await signupPage.triggerPasswordWeak();
      await expect(
        signupPage.error(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        )
      ).toBeVisible();
    });

    test('Repeat Password - required', async () => {
      await signupPage.triggerRepeatPasswordRequired();
      await expect(signupPage.error('Re-enter password required')).toBeVisible();
    });

    test('Repeat Password - mismatch', async () => {
      await signupPage.triggerPasswordMismatch();
      await expect(
        signupPage.error(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        )
      ).toBeVisible();
    });
  });
});