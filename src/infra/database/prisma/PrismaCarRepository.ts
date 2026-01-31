import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { Car } from '../../../domain/entities/Car';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';

export class PrismaCarRepository implements ICarRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Car {
    const car = this.prisma.car.findUnique({
      where: { id }
    });
    
    return car;
  }

  findByLicensePlate(licensePlate: string): Car {
    const car = this.prisma.car.findFirst({
      where: { licensePlate }
    });
    
    return car;
  }

  create(car: Car): void {
    this.prisma.car.create({
      data: {
        id: car.id,
        name: car.name,
        licensePlate: car.licensePlate,
        dailyRate: car.dailyRate,
        available: car.available
      }
    });
  }

  updateAvailability(id: string, available: boolean): any {
    this.prisma.car.update({
      where: { id },
      data: { available }
    });
  }
}
