import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const env = process.env.ENV || 'qauto';
dotenv.config({ path: `.env.${env}` });

// export default defineConfig({
  // testDir: './tests',
  // timeout: 30000,
  // expect: { timeout: 5000 },
  // fullyParallel: true,
  // retries: 1,
  // workers: 1,

  // reporter: [
    // ['list'],
    // ['html', { open: 'never' }]
  // ],
// 
  // use: {
  //   baseURL: process.env.BASE_URL,
  //   httpCredentials: {
  //     username: process.env.HTTP_USER,
  //     password: process.env.HTTP_PASSWORD,
  //   },
    // headless: false,
    // viewport: { width: 1280, height: 720 },
    // ignoreHTTPSErrors: true,
    // video: 'retain-on-failure',
    // screenshot: 'only-on-failure',
    // trace: 'on-first-retry',
  // },

  // projects: [
    // {
      // name: 'chromium',
      // use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  // ],
// });

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USER,
      password: process.env.HTTP_PASSWORD,
    },
    storageState: 'storageState.json',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
  ],
});