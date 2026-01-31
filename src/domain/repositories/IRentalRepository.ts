import { Rental } from '../entities/Rental';

export interface IRentalRepository {
  findById(id: string): Promise<Rental | null>;
  findOpenRentalByCarId(carId: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
  create(rental: Rental): Promise<Rental>;
}
