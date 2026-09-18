import { AppError } from './AppError.js';

export class BadRequestError extends AppError {
    constructor(message = 'Некорректный запрос') {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Требуется аутентификация') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Доступ запрещен') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Ресурс не найден') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Конфликт состояния ресурса') {
        super(message, 409);
    }
}
