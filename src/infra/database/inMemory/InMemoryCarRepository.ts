import { Car } from '../../../domain/entities/Car';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';

export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = [];

  findById(id: string): Car {
    return this.cars.find(car => car.id === id);
  }

  findByLicensePlate(licensePlate: string): Car {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  create(car: Car): void {
    this.cars.push(car);
  }

  updateAvailability(id: string, available: boolean): any {
    const car = this.cars.find(car => car.id === id);
    if (car) {
      car.available = available;
    }
  }
}
