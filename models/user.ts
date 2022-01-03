import Ajv, { Schema } from 'ajv';

const ajv = new Ajv({
  allErrors: true
});

enum jsonType {
  NUMBER = 'number',
  INTEGER = 'integer',
  STRING = 'string',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT = 'object',
  NULL = 'null'
}

export interface AdminResetUserPasswordReqBody {
  input: {
    userId: string;
  }
}

export interface ChangePasswordReqBody {
  input: {
    accessToken: string;
    previousPassword: string;
    proposedPassword: string;
  }
}

export interface ConfirmForgotPasswordReqBody {
  input: {
    appClientId: string;
    username: string;
    proposedPassword: string;
    confirmationCode: string;
  }
}

export interface ConfirmSignUpUserReqBody {
  input: {
    appClientId: string;
    username: string;
    confirmationCode: string;
    birthdate: string;
  }
}

export interface DynamoUserItem {
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  biography: string;
  birthdate: string;
  email: string;
  firstName: string;
  gender: 'M'|'F'|'';
  lastName: string;
  phoneNumber: string;
  subscription: {
    current: {
      datePurchased: string;
      renewalDate: string;
      tier: 'basic'|'premium';
    };
    history: {
      datePurchased: string;
      renewalDate: string;
      tier: 'basic'|'premium';
    }[];
    isActive: boolean;
    lastPaid: string;
    nextBilling: string;
    paymentFrequency: 'monthly'|'yearly'|'na';
    trial: {
      dateEnded: string;
      dateStarted: string;
      isActive: boolean;
      isExpired: boolean;
    }
  }
  userId: string;
  vault: {
    ammo: {
      brand: string;
      brassMFG: string;
      bulletWeight: string;
      caseLength: string;
      maximumPressure: string;
      name: string;
      notes: string;
      overallLength: string;
      powderType: string;
      powderVolume: string;
      powderWeight: string;
      primerType: string;
      type: string;
    };
    accessories: {
      brand: string;
      modelNumber: string;
      name: string;
      type: string;
    }[];
    brand: string;
    caliber: string;
    name: string;
    s3ImageUrl: string;
    serialNumber: string;
  }[];
}

export interface ForgotPasswordReqBody {
  input: {
    appClientId: string;
    username: string;
  }
}

export interface LoginReqBody {
  input: {
    appClientId: string;
    username: string;
    password: string;
  }
}

export interface LogoutReqBody {
  input: {
    accessToken: string;
  }
}

export interface RefreshTokenReqBody {
  input: {
    appClientId: string;
    refreshToken: string;
  };
}

export interface ResendConfirmationCodeReqBody {
  input: {
    appClientId: string;
    username: string;
  }
}

export interface SignUpUserReqBody {
  input: {
    appClientId: string;
    username: string;
    password: string;
  }
}

export interface UpdateUserAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface UpdateUserItem {
  input: {
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    address?: UpdateUserAddress;
  }
}

export interface VerifyTokenReqBody {
  input: {
    appClientId: string;
    accessToken: string;
  }
}

const adminCreateUserSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'email',
    'phoneNumber'
  ],
  properties: {
    email: { type: jsonType.STRING },
    phoneNumber: { type: jsonType.STRING },
    firstName: { type: jsonType.STRING },
    lastName: { type: jsonType.STRING },
    address: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'line1',
        'line2',
        'city',
        'state',
        'zip',
        'country'
      ],
      properties: {
        line1: { type: jsonType.STRING },
        line2: { type: jsonType.STRING, nullable: true },
        city: { type: jsonType.STRING },
        state: { type: jsonType.STRING },
        zip: { type: jsonType.STRING, nullable: true },
        country: { type: jsonType.STRING }
      }
    }
  }
} as const;

const adminResetPasswordSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      required: [
        'userId'
      ],
      properties: {
        userId: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const changePasswordSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'accessToken',
        'previousPassword',
        'proposedPassword'
      ],
      properties: {
        accessToken: {
          type: jsonType.STRING
        },
        previousPassword: {
          type: jsonType.STRING
        },
        proposedPassword: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const confirmForgotPasswordSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'username',
        'proposedPassword',
        'confirmationCode'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        username: {
          type: jsonType.STRING
        },
        proposedPassword: {
          type: jsonType.STRING
        },
        confirmationCode: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const confirmSignUpUserSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'username',
        'confirmationCode',
        'birthdate'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        username: {
          type: jsonType.STRING
        },
        confirmationCode: {
          type: jsonType.STRING
        },
        birthdate: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const forgotPasswordSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'username'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        username: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const loginSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'username',
        'password'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        username: {
          type: jsonType.STRING
        },
        password: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const logoutSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'accessToken'
      ],
      properties: {
        accessToken: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const refreshTokenSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'refreshToken'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        refreshToken: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const resendConfirmationCodeSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'username'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        username: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const signUpUserSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'username',
        'password'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        username: {
          type: jsonType.STRING
        },
        password: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

const updateUserSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [],
      properties: {
        email: { type: jsonType.STRING },
        phoneNumber: { type: jsonType.STRING },
        firstName: { type: jsonType.STRING },
        lastName: { type: jsonType.STRING },
        address: {
          type: jsonType.OBJECT,
          additionalProperties: false,
          required: [],
          properties: {
            line1: { type: jsonType.STRING },
            line2: { type: jsonType.STRING },
            city: { type: jsonType.STRING },
            state: { type: jsonType.STRING },
            zip: { type: jsonType.STRING },
            country: { type: jsonType.STRING }
          }
        }
      }
    }
  }
} as const;

const verifyTokenSchema: Schema = {
  type: jsonType.OBJECT,
  additionalProperties: false,
  required: [
    'input'
  ],
  properties: {
    input: {
      type: jsonType.OBJECT,
      additionalProperties: false,
      required: [
        'appClientId',
        'accessToken'
      ],
      properties: {
        appClientId: {
          type: jsonType.STRING
        },
        accessToken: {
          type: jsonType.STRING
        }
      }
    }
  }
} as const;

export const validateAdminCreateUser = ajv.compile(adminCreateUserSchema);
export const validateAdminResetPassword = ajv.compile(adminResetPasswordSchema);
export const validateChangePassword = ajv.compile(changePasswordSchema);
export const validateConfirmForgotPassword = ajv.compile(confirmForgotPasswordSchema);
export const validateConfirmSignUpUser = ajv.compile(confirmSignUpUserSchema);
export const validateForgotPassword = ajv.compile(forgotPasswordSchema);
export const validateLogin = ajv.compile(loginSchema);
export const validateLogout = ajv.compile(logoutSchema);
export const validateRefreshToken = ajv.compile(refreshTokenSchema);
export const validateResendConfirmationCode = ajv.compile(resendConfirmationCodeSchema);
export const validateSignUpUser = ajv.compile(signUpUserSchema);
export const validateUpdateUser = ajv.compile(updateUserSchema);
export const validateVerifyToken = ajv.compile(verifyTokenSchema);
