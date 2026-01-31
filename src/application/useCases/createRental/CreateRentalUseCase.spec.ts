// Testes unitários para CreateRentalUseCase
// ERRO: Testes incompletos e mal estruturados

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
    
    // ERRO: Instanciação manual sem usar injeção
    createRentalUseCase = new CreateRentalUseCase(
      carRepository,
      rentalRepository
    );
  });

  // ERRO: Teste básico mas falta setup adequado do carro
  it('should create a rental', () => {
    // ERRO: Carro não está sendo criado com dados corretos
    const car = new Car('car-1', 'Test Car', 'ABC-1234', 100, true);
    carRepository.create(car);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);  // 2 dias no futuro

    const rental = createRentalUseCase.execute({
      userId: 'user-1',
      carId: 'car-1',
      expectedReturnDate: futureDate
    });

    // ERRO: Assertion muito fraca
    expect(rental).toBeDefined();
  });

  // ERRO: Teste para carro não encontrado mas não trata async
  it('should throw error when car does not exist', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    // ERRO: Não está usando expect(...).rejects para async
    expect(() => {
      createRentalUseCase.execute({
        userId: 'user-1',
        carId: 'non-existent-car',
        expectedReturnDate: futureDate
      });
    }).toThrow();
  });

  // ERRO: Falta teste para carro indisponível
  // it('should not create rental when car is unavailable')

  // ERRO: Falta teste para usuário com aluguel em aberto
  // it('should not create rental when user has open rental')

  // ERRO: Falta teste para duração mínima de 24h
  // it('should not create rental with less than 24 hours')
});
