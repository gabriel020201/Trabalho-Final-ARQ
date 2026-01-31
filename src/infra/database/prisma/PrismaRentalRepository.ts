import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { Rental } from '../../../domain/entities/Rental';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';

export class PrismaRentalRepository implements IRentalRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Rental {
    const rental = this.prisma.rental.findUnique({
      where: { id }
    });
    
    return rental;
  }

  findOpenRentalByCarId(carId: string): Rental | null {
    const rental = this.prisma.rental.findFirst({
      where: {
        carId,
        endDate: null
      }
    });
    
    return rental;
  }

  findOpenRentalByUserId(userId: string): Rental {
    const rental = this.prisma.rental.findFirst({
      where: {
        userId,
        endDate: null
      }
    });
    
    return rental;
  }

  create(rental: Rental): void {
    this.prisma.rental.create({
      data: {
        id: rental.id,
        carId: rental.carId,
        userId: rental.userId,
        startDate: rental.startDate,
        expectedReturnDate: rental.expectedReturnDate,
        endDate: rental.endDate,
        total: rental.total
      }
    });
  }
}
