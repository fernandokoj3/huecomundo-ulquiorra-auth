export class BaseError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode?: number,
    ) {
        super(message);
    }
}

export class SchemaValidationError {
    constructor(
        public readonly messages: Array<String>,
        public readonly fieldName: String
    ) {

    }
}

export class ValidationError extends BaseError { }
