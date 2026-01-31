export class Rental {
  public readonly id: string;
  public readonly carId: string;
  public readonly userId: string;
  public readonly startDate: Date;
  public readonly expectedReturnDate: Date;
  public endDate: Date | null;
  public total: number | null;

  constructor(
    id: string,
    carId: string,
    userId: string,
    startDate: Date,
    expectedReturnDate: Date
  ) {
    this.id = id;
    this.carId = carId;
    this.userId = userId;
    this.startDate = startDate;
    this.expectedReturnDate = expectedReturnDate;
    this.endDate = null;
    this.total = null;
  }
}
