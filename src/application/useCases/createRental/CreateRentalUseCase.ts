// Use Case: Criar Aluguel
// ERRO: Lógica de validação incompleta e problemas com injeção

import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infra/container/types';
import { ICarRepository } from '../../../domain/repositories/ICarRepository';
import { IRentalRepository } from '../../../domain/repositories/IRentalRepository';
import { Rental } from '../../../domain/entities/Rental';
import { CreateRentalDTO } from './CreateRentalDTO';

// ERRO: Falta @injectable()
export class CreateRentalUseCase {
  // ERRO: Falta os decorators @inject nos parâmetros do construtor
  constructor(
    private carRepository: ICarRepository,
    private rentalRepository: IRentalRepository
  ) {}

  // ERRO: Método não é async
  execute(data: CreateRentalDTO): Rental {
    const { userId, carId, expectedReturnDate } = data;

    // ERRO: Validação de carro disponível incompleta
    const car = this.carRepository.findById(carId);
    
    if (!car) {
      throw new Error('Car not found');
    }

    // ERRO: Falta verificar se o carro está disponível (car.available)
    
    // ERRO: Validação de usuário com aluguel em aberto faltando
    // Deveria verificar: findOpenRentalByUserId(userId)

    // ERRO: Validação de duração mínima de 24h faltando
    // Deveria calcular diferença entre expectedReturnDate e agora

    // ERRO: Não gera UUID para o rental
    const rental = new Rental(
      'some-id',  // ERRO: Deveria usar uuid()
      carId,
      userId,
      new Date(),
      expectedReturnDate
    );

    // ERRO: Não atualiza disponibilidade do carro
    // Deveria chamar: carRepository.updateAvailability(carId, false)

    this.rentalRepository.create(rental);

    return rental;
  }
}
