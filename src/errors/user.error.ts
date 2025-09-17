class ApiError extends Error {
  constructor(message: string, status: number) {
    (super(status), (this.message = message));
  }
}
