export class InvalidCredentialsError extends Error {
  constructor() {
    super("Credencias invalidas");
    this.name = "InvalidCredentialsError";
  }
}
