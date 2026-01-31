import { Rental } from '../../../domain/entities/Rental';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';

export class InMemoryRentalRepository implements IRentalRepository {
  private rentals: Rental[] = [];

  async findById(id: string): Promise<Rental | null> {
    const rental = this.rentals.find(rental => rental.id === id);
    return rental || null;
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      rental => rental.carId === carId && rental.endDate === null
    );
    return rental || null;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      rental => rental.userId === userId && rental.endDate === null
    );
    return rental || null;
  }

  async create(rental: Rental): Promise<Rental> {
    this.rentals.push(rental);
    return rental;
  }
}
