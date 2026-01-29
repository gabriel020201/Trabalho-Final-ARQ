// Entidade Rental - Representa um aluguel no sistema
// ERRO: Atributos com tipagem inconsistente

export class Rental {
  public id; // ERRO: falta tipagem
  public carId: any; // ERRO: deveria ser string
  public userId: any; // ERRO: deveria ser string
  public startDate; // ERRO: falta tipagem Date
  public expectedReturnDate; // ERRO: falta tipagem Date
  public endDate; // ERRO: falta tipagem Date | null
  public total; // ERRO: falta tipagem number | null

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
