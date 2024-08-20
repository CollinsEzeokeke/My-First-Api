// validationSchema.ts
import { Schema } from 'express-validator';

// Validation for the created user
export const validationSchema: Schema = {
  username: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: "Username should not be left empty",
    },
    isLength: {
      options: {
        min: 3,
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
        min: 3,
        max: 35,
      },
      errorMessage: "Display name must be between 6 and 35 characters",
    },
  },
  password: {
    in: ['body'],
    isString: true,
    isStrongPassword: true,
    notEmpty: {
      errorMessage: "Password should not be left empty",
    },
    isLength: {
      options: {
        min: 6,
        max: 20,
      },
      errorMessage: "Password must be between 6 and 20 characters",
    },
  },
  email: {
    in: ['body'],
    isEmail: true,
    notEmpty: {
      errorMessage: "Email should not be left empty",
    },
  },
};


//Validation for the query parameters
export const validationSchemaQuery: Schema = {
  username: {
    in: ['query'],
    isString: true,
    optional: true,
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Username must be between 6 and 20 characters",
    },
  },
  displayName: {
    in: ['query'],
    isString: true,
    optional: true,
    isLength: {
      options: {
        min: 3,
        max: 35,
      },
      errorMessage: "Display name must be between 6 and 35 characters",
    },
  },
};

// Validation for id parameter
export const validationSchemaId: Schema = {
  id: {
    in: ['params'],
    isNumeric: true,
  },
};

// Validation for the update parameters
export const validationSchemaUpdate: Schema = {
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

// Validation for the optional update parameters
export const validationSchemaUpdateOptional: Schema = {
  username: {
    in: ['body'],
    isString: true,
    optional: true,
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
    optional: true,
    isLength: {
      options: {
        min: 6,
        max: 35,
      },
      errorMessage: "Display name must be between 6 and 35 characters",
    },
  },
  customCheck: {
    in: ['body'],
    custom: {
      options: (value, { req }) => {
        if (!req.body.username && !req.body.displayName) {
          console.log(value)
          throw new Error('Either username or displayName must be provided');
        }
        return true;
      },
    },
  },
}

// Validation for the login parameters
export const validatiorLoginSchema: Schema = {
  username: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: "Username should not be left empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Username must be between 6 and 20 characters",
    },
  },
  password: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: "Password should not be left empty",
    },
    isLength: {
      options: {
        min: 6,
        max: 20,
      },
      errorMessage: "Password must be between 6 and 20 characters",
    },
  }
};
