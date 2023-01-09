import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Class } from "utility-types";
import { SchemaValidationError } from "./model/exception";

export async function validateObject<T = any>(
    obj: any,
    validationClass: Class<T>,
    options?: any,
): Promise<{ error?: SchemaValidationError[]; data?: T }> {
    obj = plainToInstance(validationClass, obj);

    let errors = await validate(obj, validationClass, {
        ...options,
    });

    if (errors.length === 0) {
        return {
            data: obj,
        };
    }

    const classValidatorErrors: SchemaValidationError[] = [];

    errors.forEach(error => {
        const messages = [];

        let errorFields = Object.entries(
            error?.constraints ? error?.constraints : {},
        );

        let fieldName: string;
        errorFields.forEach(field => {
            const value = field[0];

            messages.push(value);
            fieldName = error?.property;
        });

        classValidatorErrors.push(
            new SchemaValidationError(messages, fieldName),
        );
    });

    const error = classValidatorErrors;

    return { error };
}
