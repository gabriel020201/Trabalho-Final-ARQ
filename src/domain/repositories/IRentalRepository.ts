import { Rental } from '../entities/Rental';

export interface IRentalRepository {
  findById(id: string): Rental;
  
  findOpenRentalByCarId(carId: string): Rental | null;
  
  findOpenRentalByUserId(userId: string): Rental;
  
  create(rental: Rental): void;
}
