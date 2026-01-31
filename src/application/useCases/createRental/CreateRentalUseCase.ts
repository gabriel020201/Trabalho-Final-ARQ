import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infra/container/types';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';
import { Rental } from '../../../domain/entities/Rental';
import { CreateRentalDTO } from './CreateRentalDTO';

export class CreateRentalUseCase {
  constructor(
    private carRepository: ICarRepository,
    private rentalRepository: IRentalRepository
  ) {}

  execute(data: CreateRentalDTO): Rental {
    const { userId, carId, expectedReturnDate } = data;

    const car = this.carRepository.findById(carId);
    
    if (!car) {
      throw new Error('Car not found');
    }

    const rental = new Rental(
      'some-id',
      carId,
      userId,
      new Date(),
      expectedReturnDate
    );

    this.rentalRepository.create(rental);

    return rental;
  }
}
