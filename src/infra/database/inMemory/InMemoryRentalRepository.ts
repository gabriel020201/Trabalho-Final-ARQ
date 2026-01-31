import { Rental } from '../../../domain/entities/Rental';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';

export class InMemoryRentalRepository implements IRentalRepository {
  private rentals: Rental[] = [];

  findById(id: string): Rental {
    return this.rentals.find(rental => rental.id === id);
  }

  findOpenRentalByCarId(carId: string): Rental | null {
    return this.rentals.find(rental => rental.carId === carId);
  }

  findOpenRentalByUserId(userId: string): Rental {
    return this.rentals.find(rental => rental.userId === userId);
  }

  create(rental: Rental): void {
    this.rentals.push(rental);
  }
}
