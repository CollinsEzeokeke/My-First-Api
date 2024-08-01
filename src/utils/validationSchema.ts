// validationSchema.ts
import { Schema } from 'express-validator';

export const validationSchema: Schema = {
  username: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: "Username should not be left empty",
    },
    isLength: {
      options: {
        min: 6,
        max: 20,
      },
      errorMessage: "Username must be between 6 and 20 characters",
    },
  },
  displayName: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: "Display name should not be left empty",
    },
    isLength: {
      options: {
        min: 6,
        max: 35,
      },
      errorMessage: "Display name must be between 6 and 35 characters",
    },
  },
};
