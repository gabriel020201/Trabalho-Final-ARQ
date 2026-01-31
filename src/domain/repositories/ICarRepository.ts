import { Car } from '../entities/Car';

export interface ICarRepository {
  findById(id: string): Promise<Car | null>;
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  create(car: Car): Promise<Car>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}
