export class HttpException extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.name = this.constructor.name
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message)
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(404, message)
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(401, message)
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(403, message)
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(500, message)
  }
}
