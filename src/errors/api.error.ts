export class ApiError extends Error {
  constructor(
    public massage: string,
    public status: number,
  ) {
    super(massage);
    this.status = status;
  }
}
