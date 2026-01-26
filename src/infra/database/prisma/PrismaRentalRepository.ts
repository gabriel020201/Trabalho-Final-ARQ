// Repositório Prisma para Rental
// ERRO: Implementação com problemas de async/await e tipagem

import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { Rental } from '../../../domain/entities/Rental';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';

// ERRO: Falta o decorator @injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // ERRO: Não é async e retorno incorreto
  findById(id: string): Rental {
    const rental = this.prisma.rental.findUnique({
      where: { id }
    });
    
    return rental;
  }

  // ERRO: Não é async
  findOpenRentalByCarId(carId: string): Rental | null {
    const rental = this.prisma.rental.findFirst({
      where: {
        carId,
        endDate: null
      }
    });
    
    return rental;
  }

  // ERRO: Não é async e retorno pode ser null
  findOpenRentalByUserId(userId: string): Rental {
    const rental = this.prisma.rental.findFirst({
      where: {
        userId,
        endDate: null
      }
    });
    
    return rental;
  }

  // ERRO: Não é async
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
