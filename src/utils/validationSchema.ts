// Validation Schema for the creation of users
export const validationSchema = {
  username: {
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