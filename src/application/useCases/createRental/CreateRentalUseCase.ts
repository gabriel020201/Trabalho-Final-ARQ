import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infra/container/types';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';
import { Rental } from '../../../domain/entities/Rental';
import { CreateRentalDTO } from './CreateRentalDTO';
import { v4 as uuidv4 } from 'uuid';

const MINIMUM_RENTAL_HOURS = 24;
const HOURS_IN_MS = 1000 * 60 * 60;

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.ICarRepository)
    private carRepository: ICarRepository,
    @inject(TYPES.IRentalRepository)
    private rentalRepository: IRentalRepository
  ) {}

  async execute(data: CreateRentalDTO): Promise<Rental> {
    const { userId, carId, expectedReturnDate } = data;

    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new Error('Car not found');
    }

    if (!car.available) {
      throw new Error('Car is not available');
    }

    const existingCarRental = await this.rentalRepository.findOpenRentalByCarId(carId);
    if (existingCarRental) {
      throw new Error('Car already has an open rental');
    }

    const existingUserRental = await this.rentalRepository.findOpenRentalByUserId(userId);
    if (existingUserRental) {
      throw new Error('User already has an open rental');
    }

    const now = new Date();
    const diffInHours = (expectedReturnDate.getTime() - now.getTime()) / HOURS_IN_MS;
    
    if (diffInHours < MINIMUM_RENTAL_HOURS) {
      throw new Error('Rental must have a minimum duration of 24 hours');
    }

    const rental = new Rental(
      uuidv4(),
      carId,
      userId,
      now,
      expectedReturnDate
    );

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailability(carId, false);

    return rental;
  }
}
