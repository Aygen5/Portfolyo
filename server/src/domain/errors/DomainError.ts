export class DomainError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found.`, 404);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized access.') {
    super(message, 401);
  }
}
