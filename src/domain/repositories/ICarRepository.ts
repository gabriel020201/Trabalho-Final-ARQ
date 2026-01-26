import { Car } from '../entities/Car';

export interface ICarRepository {
  findById(id: string): Car;
  
  findByLicensePlate(licensePlate: string): Car;
  
  create(car: Car): void;
  
  updateAvailability(id: string, available: boolean): any;
}
