import { container } from '../../infra/container';
import { TYPES } from '../../infra/container/types';
import { CreateRentalUseCase } from '../../application/useCases/createRental/CreateRentalUseCase';

async function main() {
  console.log('=== RentX - Sistema de Locação ===\n');

  const createRentalUseCase = new CreateRentalUseCase(
    container.get(TYPES.CarRepository),
    container.get(TYPES.RenatlRepository)
  );

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);

  const rental = createRentalUseCase.execute({
    userId: 'user-123',
    carId: 'car-456',
    expectedReturnDate: futureDate
  });

  console.log('Aluguel criado:', rental);
}

main();
