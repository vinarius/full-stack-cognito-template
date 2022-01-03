export const notAuthorizedError = {
  success: false,
  validationErrors: [
    {
      'instancePath': '',
      'schemaPath': '',
      'keyword': 'NotAuthorized',
      'params': null,
      'message': 'NotAuthorizedException'
    }
  ],
  statusCode: 400
};

export const invalidTokenError = {
  success: false,
  validationErrors: [
    {
      'instancePath': '',
      'schemaPath': '',
      'keyword': 'NotAuthorized',
      'params': null,
      'message': 'NotAuthorizedException: Invalid Access Token'
    }
  ],
  statusCode: 400
};

export const codeMismatchError = {
  success: false,
  validationErrors: [
    {
      'instancePath': '',
      'schemaPath': '',
      'keyword': 'CodeMismatch',
      'params': {},
      'message': 'CodeMismatchException'
    }
  ],
  statusCode: 400
};