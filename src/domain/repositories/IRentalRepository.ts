// Interface do repositório de aluguéis
// ERRO: Tipagem inconsistente e faltando Promise nos retornos

import { Rental } from '../entities/Rental';

export interface IRentalRepository {
  // ERRO: Retorno deveria ser Promise<Rental | null>
  findById(id: string): Rental;
  
  // ERRO: Falta Promise no retorno
  findOpenRentalByCarId(carId: string): Rental | null;
  
  // ERRO: Falta Promise no retorno
  findOpenRentalByUserId(userId: string): Rental;
  
  // ERRO: Deveria retornar Promise<Rental>
  create(rental: Rental): void;
}
