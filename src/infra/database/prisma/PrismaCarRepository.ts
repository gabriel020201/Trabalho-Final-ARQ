// Repositório Prisma para Car
// ERRO: Importações incorretas e implementação incompleta

import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { Car } from '../../../domain/entities/Car';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';

// ERRO: Falta o decorator @injectable()
export class PrismaCarRepository implements ICarRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // ERRO: Método não é async e retorno incorreto
  findById(id: string): Car {
    const car = this.prisma.car.findUnique({
      where: { id }
    });
    
    // ERRO: Não trata caso null e não converte corretamente
    return car;
  }

  // ERRO: Método não é async
  findByLicensePlate(licensePlate: string): Car {
    const car = this.prisma.car.findFirst({
      where: { licensePlate }
    });
    
    return car;
  }

  // ERRO: Método não é async e não retorna nada
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

  // ERRO: Método não é async
  updateAvailability(id: string, available: boolean): any {
    this.prisma.car.update({
      where: { id },
      data: { available }
    });
  }
}
