import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { Rental } from '../../../domain/entities/Rental';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findUnique({
      where: { id }
    });

    if (!rental) {
      return null;
    }

    return new Rental(
      rental.id,
      rental.carId,
      rental.userId,
      rental.startDate,
      rental.expectedReturnDate
    );
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        carId,
        endDate: null
      }
    });

    if (!rental) {
      return null;
    }

    return new Rental(
      rental.id,
      rental.carId,
      rental.userId,
      rental.startDate,
      rental.expectedReturnDate
    );
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        userId,
        endDate: null
      }
    });

    if (!rental) {
      return null;
    }

    return new Rental(
      rental.id,
      rental.carId,
      rental.userId,
      rental.startDate,
      rental.expectedReturnDate
    );
  }

  async create(rental: Rental): Promise<Rental> {
    const createdRental = await this.prisma.rental.create({
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

    return new Rental(
      createdRental.id,
      createdRental.carId,
      createdRental.userId,
      createdRental.startDate,
      createdRental.expectedReturnDate
    );
  }
}
