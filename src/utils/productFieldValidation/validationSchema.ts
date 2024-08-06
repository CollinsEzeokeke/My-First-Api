import { Schema } from 'express-validator';

// Validation for the query parameters
export const queryValidationSchema: Schema = {
    category: {
        in: ['query'],
        isString: true,
        optional: true,
        isLength: {
            options: {
                min: 3,
                max: 35,
            },
            errorMessage: "Category must be between 6 and 35 characters",
        },
    },
    name: {
        in: ['query'],
        isString: true,
        optional: true,
        isLength: {
            options: {
                min: 3,
                max: 35,
            },
            errorMessage: "Name must be between 6 and 35 characters",
        },
    },
}

