import { ErrorObject } from 'ajv';

export interface HandlerResponse {
  success: boolean;
  validationErrors?: ErrorObject<string, Record<string, unknown>, unknown>[];
}