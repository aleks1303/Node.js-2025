export class ApiError extends Error {
  constructor(
    public massage: string,
    public status: string,
  ) {
    super(massage);
    this.status = status;
  }
}
