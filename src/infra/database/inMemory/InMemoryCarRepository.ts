import { Car } from '../../../domain/entities/Car';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';

export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = [];

  async findById(id: string): Promise<Car | null> {
    const car = this.cars.find(car => car.id === id);
    return car || null;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.cars.find(car => car.licensePlate === licensePlate);
    return car || null;
  }

  async create(car: Car): Promise<Car> {
    this.cars.push(car);
    return car;
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    if (car) {
      car.available = available;
    }
  }
}
