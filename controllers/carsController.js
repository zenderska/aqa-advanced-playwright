export class CarsController {
  constructor(apiContext) {
    this.api = apiContext;
  }

  async createCar(data) {
    return await this.api.post('/api/cars', { data });
  }

  async deleteCar(carId) {
    return await this.api.delete(`/api/cars/${carId}`);
  }
}