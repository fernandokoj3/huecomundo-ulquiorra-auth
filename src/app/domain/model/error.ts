export class BaseError extends Error {
    constructor(
        public readonly code: number,
        public readonly message: string,
        public readonly field?: string
    ) {
        super(message);
    }
}

export class PreConditionFailedException extends BaseError {}
export class InvalidScopeException extends BaseError {}
export class ForbiddenException extends BaseError {}
export class UnauthorizedException extends BaseError {}
export class InvalidGrantTypeException extends BaseError {}