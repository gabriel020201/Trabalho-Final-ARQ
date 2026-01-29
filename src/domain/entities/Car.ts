// Entidade Car - Representa um veículo no sistema
// ERRO: Falta tipagem correta e alguns atributos estão com tipos errados

export class Car {
  public id: any; // ERRO: deveria ser string
  public name; // ERRO: falta tipagem
  public licensePlate: any; // ERRO: deveria ser string
  public available: string; // ERRO: deveria ser boolean
  public dailyRate; // ERRO: falta tipagem

  constructor(
    id,
    name,
    licensePlate,
    dailyRate,
    available
  ) {
    this.id = id;
    this.name = name;
    this.licensePlate = licensePlate;
    this.dailyRate = dailyRate;
    this.available = available;
  }
}
