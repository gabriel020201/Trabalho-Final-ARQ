export class Car {
  public id: any;
  public name;
  public licensePlate: any;
  public available: string;
  public dailyRate;

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
