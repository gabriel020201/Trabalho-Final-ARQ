import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { Car } from '../../../domain/entities/Car';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';

@injectable()
export class PrismaCarRepository implements ICarRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Car | null> {
    const car = await this.prisma.car.findUnique({
      where: { id }
    });

    if (!car) {
      return null;
    }

    return new Car(
      car.id,
      car.name,
      car.licensePlate,
      car.dailyRate,
      car.available
    );
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = await this.prisma.car.findFirst({
      where: { licensePlate }
    });

    if (!car) {
      return null;
    }

    return new Car(
      car.id,
      car.name,
      car.licensePlate,
      car.dailyRate,
      car.available
    );
  }

  async create(car: Car): Promise<Car> {
    const createdCar = await this.prisma.car.create({
      data: {
        id: car.id,
        name: car.name,
        licensePlate: car.licensePlate,
        dailyRate: car.dailyRate,
        available: car.available
      }
    });

    return new Car(
      createdCar.id,
      createdCar.name,
      createdCar.licensePlate,
      createdCar.dailyRate,
      createdCar.available
    );
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await this.prisma.car.update({
      where: { id },
      data: { available }
    });
  }
}
