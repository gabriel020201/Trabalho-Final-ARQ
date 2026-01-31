import { describe, it, expect, beforeEach } from 'vitest';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { InMemoryCarRepository } from '../../../infra/database/inMemory/InMemoryCarRepository';
import { InMemoryRentalRepository } from '../../../infra/database/inMemory/InMemoryRentalRepository';
import { Car } from '../../../domain/entities/Car';

describe('CreateRentalUseCase', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let carRepository: InMemoryCarRepository;
  let rentalRepository: InMemoryRentalRepository;

  beforeEach(() => {
    carRepository = new InMemoryCarRepository();
    rentalRepository = new InMemoryRentalRepository();
    createRentalUseCase = new CreateRentalUseCase(carRepository, rentalRepository);
  });

  function getFutureDate(daysAhead: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date;
  }

  it('should create a rental successfully', async () => {
    const car = new Car('car-1', 'Honda Civic', 'ABC-1234', 150, true);
    await carRepository.create(car);

    const rental = await createRentalUseCase.execute({
      userId: 'user-1',
      carId: 'car-1',
      expectedReturnDate: getFutureDate(3)
    });

    expect(rental).toBeDefined();
    expect(rental.carId).toBe('car-1');
    expect(rental.userId).toBe('user-1');
    expect(rental.id).toBeDefined();
  });

  it('should throw error when car does not exist', async () => {
    await expect(
      createRentalUseCase.execute({
        userId: 'user-1',
        carId: 'nonexistent-car',
        expectedReturnDate: getFutureDate(3)
      })
    ).rejects.toThrow('Car not found');
  });

  it('should not create rental when car is unavailable', async () => {
    const car = new Car('car-1', 'Honda Civic', 'ABC-1234', 150, false);
    await carRepository.create(car);

    await expect(
      createRentalUseCase.execute({
        userId: 'user-1',
        carId: 'car-1',
        expectedReturnDate: getFutureDate(3)
      })
    ).rejects.toThrow('Car is not available');
  });

  it('should not create rental when user already has an open rental', async () => {
    const car1 = new Car('car-1', 'Honda Civic', 'ABC-1234', 150, true);
    const car2 = new Car('car-2', 'Toyota Corolla', 'XYZ-5678', 180, true);
    await carRepository.create(car1);
    await carRepository.create(car2);

    await createRentalUseCase.execute({
      userId: 'user-1',
      carId: 'car-1',
      expectedReturnDate: getFutureDate(3)
    });

    await expect(
      createRentalUseCase.execute({
        userId: 'user-1',
        carId: 'car-2',
        expectedReturnDate: getFutureDate(3)
      })
    ).rejects.toThrow('User already has an open rental');
  });

  it('should not create rental with duration less than 24 hours', async () => {
    const car = new Car('car-1', 'Honda Civic', 'ABC-1234', 150, true);
    await carRepository.create(car);

    const returnDate = new Date();
    returnDate.setHours(returnDate.getHours() + 12);

    await expect(
      createRentalUseCase.execute({
        userId: 'user-1',
        carId: 'car-1',
        expectedReturnDate: returnDate
      })
    ).rejects.toThrow('Rental must have a minimum duration of 24 hours');
  });

  it('should update car availability to false after creating rental', async () => {
    const car = new Car('car-1', 'Honda Civic', 'ABC-1234', 150, true);
    await carRepository.create(car);

    await createRentalUseCase.execute({
      userId: 'user-1',
      carId: 'car-1',
      expectedReturnDate: getFutureDate(3)
    });

    const updatedCar = await carRepository.findById('car-1');
    expect(updatedCar?.available).toBe(false);
  });

  it('should not create rental when car already has an open rental', async () => {
    const car = new Car('car-1', 'Honda Civic', 'ABC-1234', 150, true);
    await carRepository.create(car);

    await createRentalUseCase.execute({
      userId: 'user-1',
      carId: 'car-1',
      expectedReturnDate: getFutureDate(3)
    });

    await expect(
      createRentalUseCase.execute({
        userId: 'user-2',
        carId: 'car-1',
        expectedReturnDate: getFutureDate(3)
      })
    ).rejects.toThrow('Car is not available');
  });
});
