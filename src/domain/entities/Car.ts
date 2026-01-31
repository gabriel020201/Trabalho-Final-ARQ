export class Car {
  public readonly id: string;
  public readonly name: string;
  public readonly licensePlate: string;
  public readonly dailyRate: number;
  public available: boolean;

  constructor(
    id: string,
    name: string,
    licensePlate: string,
    dailyRate: number,
    available: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.licensePlate = licensePlate;
    this.dailyRate = dailyRate;
    this.available = available;
  }
}
