import { test, expect, request } from '@playwright/test';

let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: 'https://qauto.forstudy.space',
    storageState: 'storageState.json'
  });
});

test('Create car - valid data', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 2,
      mileage: 43700
    }
  });

  const body = await response.json();
  const carId = body.data.id;

  expect(carId).toBeDefined();

  await apiContext.delete(`/api/cars/${carId}`);
});



test('Create car - empty body', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {}
  });

  expect(response.status()).toBe(400);
});

test('Create car - invalid Brand', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: '6',
      carModelId: '1',
      mileage: 10308
    }
  });

  expect(response.status()).toBe(404);
});

  test('Create car - invalid Model', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: '4',
      carModelId: '25',
      mileage: 90444
    }
  });

  expect(response.status()).toBe(404);
});

    test('Create car - invalid Data', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: '8',
      carModelId: '51',
      mileage: -999
    }
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);
});