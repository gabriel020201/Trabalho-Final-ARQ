import 'reflect-metadata';
import { container } from '../../infra/container';
import { TYPES } from '../../infra/container/types';
import { CreateRentalUseCase } from '../../application/useCases/createRental/CreateRentalUseCase';
import { ICarRepository } from '../../domain/repositories/ICarRepository';
import { Car } from '../../domain/entities/Car';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  console.log('===========================================');
  console.log('       RentX - Sistema de Locação         ');
  console.log('===========================================\n');

  try {
    const carRepository = container.get<ICarRepository>(TYPES.ICarRepository);
    const createRentalUseCase = container.get<CreateRentalUseCase>(TYPES.CreateRentalUseCase);

    const carId = uuidv4();
    const car = new Car(carId, 'Honda Civic', 'ABC-1234', 150.00, true);

    console.log('Criando carro de exemplo...');
    await carRepository.create(car);
    console.log(`Carro criado: ${car.name} (${car.licensePlate})\n`);

    const expectedReturnDate = new Date();
    expectedReturnDate.setDate(expectedReturnDate.getDate() + 3);

    console.log('Criando aluguel...');
    const rental = await createRentalUseCase.execute({
      userId: 'user-123',
      carId: carId,
      expectedReturnDate
    });

    console.log('Aluguel criado com sucesso!\n');
    console.log('-------------------------------------------');
    console.log('Detalhes do Aluguel:');
    console.log('-------------------------------------------');
    console.log(`ID:                  ${rental.id}`);
    console.log(`ID do Carro:         ${rental.carId}`);
    console.log(`ID do Usuário:       ${rental.userId}`);
    console.log(`Data de Início:      ${rental.startDate.toLocaleString('pt-BR')}`);
    console.log(`Devolução Prevista:  ${rental.expectedReturnDate.toLocaleString('pt-BR')}`);
    console.log('-------------------------------------------\n');

    const updatedCar = await carRepository.findById(carId);
    console.log(`Status do carro após aluguel: ${updatedCar?.available ? 'Disponível' : 'Indisponível'}`);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }

  console.log('\n===========================================');
  console.log('           Execução Finalizada            ');
  console.log('===========================================');
}

main();
