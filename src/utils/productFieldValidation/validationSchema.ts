import { Schema } from "express-validator";

// Validation for the query parameters
export const queryValidationSchema: Schema = {
  category: {
    in: ["query"],
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
    in: ["query"],
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
};

// validation for the product body for update
export const productBodyValidationSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    isLength: {
      options: {
        min: 3,
        max: 35,
      },
      errorMessage: "Name must be between 6 and 35 characters",
    },
  },
  price: {
    in: ["body"],
    isFloat: true,
    isLength: {
      options: {
        min: 1,
        max: 10,
      },
      errorMessage: "Price must be between 1 and 10",
    },
  },
  description: {
    in: ["body"],
    isString: true,
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "Description must be between 3 and 100 characters",
    },
  },
  image: {
    in: ["body"],
    isString: true,
    optional: false,
    errorMessage: "Image of your product is required",
    isURL: {
      options: {
        require_protocol: true,
        require_tld: false,
      },
      errorMessage: "Image must be a valid URL",
    },
  },
};

// validation for the certain fields of a product for update
export const targetedUpdateProductValidationSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Name is required",
    isLength: {
      options: {
        min: 3,
        max: 35,
      },
      errorMessage: "Name must be between 6 and 35 characters",
    },
  },
  price: {
    in: ["body"],
    isFloat: true,
    optional: true,
    errorMessage: "Price is required",
    isLength: {
      options: {
        min: 1,
        max: 10,
      },
      errorMessage: "Price must be between 1 and 10",
    },
  },
  category: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Category of your product is required",
    isLength: {
      options: {
        min: 3,
        max: 35,
      },
      errorMessage: "Category must be between 6 and 35 characters",
    },
  },
  description: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Description of your product is required",
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "Description must be between 3 and 100 characters",
    },
  },
  image: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Image of your product is required",
    isURL: {
      options: {
        require_protocol: true,
        require_tld: false,
      },
      errorMessage: "Image must be a valid URL",
    },
  },

};

//validation for the creation of a product
export const createProductValidationSchema: Schema = {
  name: {
    in: ["body"],
    isString: true,
    optional: false,
    errorMessage: "Name is required",
    isLength: {
      options: {
        min: 3,
        max: 35,
      },
      errorMessage: "Name must be between 6 and 35 characters",
    },
  },
  price: {
    in: ["body"],
    isFloat: true,
    optional: false,
    errorMessage: "Price is required",
    isLength: {
      options: {
        min: 1,
        max: 10,
      },
      errorMessage: "Price must be between 1 and 10",
    },
  },
  category: {
    in: ["body"],
    isString: true,
    optional: false,
    errorMessage: "Category of your product is required",
    isLength: {
      options: {
        min: 3,
        max: 35,
      },
      errorMessage: "Category must be between 6 and 35 characters",
    },
  },
  description: {
    in: ["body"],
    isString: true,
    optional: false,
    errorMessage: "Description of your product is required",
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "Description must be between 3 and 100 characters",
    },
  },
  image: {
    in: ["body"],
    isString: true,
    optional: false,
    errorMessage: "Image of your product is required",
    isURL: {
      options: {
        require_protocol: true,
        require_tld: false,
      },
      errorMessage: "Image must be a valid URL",
    },
  },
};