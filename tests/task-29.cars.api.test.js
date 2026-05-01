import { test, expect, request } from '@playwright/test';
import { CarsController } from '../controllers/carsController';

let apiContext;
let carsController;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: 'https://qauto.forstudy.space',
  });

  const authResponse = await apiContext.post('/api/auth/signin', {
    data: {
      email: 'geresat765@paylaar.com',
      password: 'Password123'
    }
  });

  expect(authResponse.ok()).toBeTruthy();

  carsController = new CarsController(apiContext);
});

test('Create car - valid data', async () => {
  const response = await carsController.createCar({
    carBrandId: 1,
    carModelId: 2,
    mileage: 43700
  });

  const body = await response.json();
  const carId = body.data.id;

  expect(carId).toBeDefined();

  await carsController.deleteCar(carId);
});

test('Create car - empty body', async () => {
  const response = await carsController.createCar({});
  expect(response.status()).toBe(400);
});

test('Create car - invalid brand', async () => {
  const response = await carsController.createCar({
    carBrandId: '6',
    carModelId: '1',
    mileage: 10308
  });

  expect(response.status()).toBe(404);
});

test('Create car - invalid model', async () => {
  const response = await carsController.createCar({
    carBrandId: '4',
    carModelId: '25',
    mileage: 90444
  });

  expect(response.status()).toBe(404);
});

test('Create car - invalid data', async () => {
  const response = await carsController.createCar({
    carBrandId: '8',
    carModelId: '51',
    mileage: -999
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);
});