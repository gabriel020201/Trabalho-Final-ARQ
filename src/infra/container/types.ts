// Símbolos para injeção de dependência
// ERRO: Símbolos com nomes inconsistentes

export const TYPES = {
  // ERRO: Nome inconsistente (CarRepository vs ICarRepository)
  CarRepository: Symbol.for('CarRepository'),
  
  // ERRO: Nome com typo
  RenatlRepository: Symbol.for('RentalRepository'),
  
  // ERRO: Falta o CreateRentalUseCase
};
