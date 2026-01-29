// Interface do repositório de carros
// ERRO: Método findById com retorno incorreto, deveria ser Promise

import { Car } from '../entities/Car';

export interface ICarRepository {
  // ERRO: Retorno deveria ser Promise<Car | null>
  findById(id: string): Car;
  
  // ERRO: Retorno deveria ser Promise<Car | null>
  findByLicensePlate(licensePlate: string): Car;
  
  // ERRO: Retorno deveria ser Promise<Car>
  create(car: Car): void;
  
  // ERRO: Retorno deveria ser Promise<void>
  updateAvailability(id: string, available: boolean): any;
}
