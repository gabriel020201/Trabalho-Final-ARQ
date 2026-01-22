export class Rental {
  public id; 
  public carId: any; 
  public userId: any; 
  public startDate; 
  public expectedReturnDate; 
  public endDate; 
  public total; 

  constructor(
    id,
    carId,
    userId,
    startDate,
    expectedReturnDate
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
