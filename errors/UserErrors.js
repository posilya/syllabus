import { ConflictError } from './HttpErrors.js';

export class UserAlreadyExistsError extends ConflictError {
    constructor(message = 'Пользователь с такими данными уже существует') {
        super(message);
    }
}
