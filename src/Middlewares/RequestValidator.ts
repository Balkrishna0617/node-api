import { AddEmployeeSchema } from '../Models/Employee.Joi';
import { NextFunction, Request, Response } from "express";
import * as _ from 'lodash';
import Joi from 'joi';

export const RequestSchema = {
    'post:/emp' : AddEmployeeSchema
}




export const RequestValidator = (apiRoute: string = '', useJoiError = false) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false,  // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true  // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();
    const route = method + ":" + apiRoute;
    // console.log('_supportedMethods: ', _supportedMethods);
    // console.log('route: ', route, _.includes(_supportedMethods, method), _.has(RequestSchema, route));

    if (_.includes(_supportedMethods, method) && _.has(RequestSchema, route)) {

       
      // get schema for the current route
      const _schema = _.get(RequestSchema, route);

      if (_schema) {
          console.log('req.body: ', req.body);
        // Validate req.body using the schema and validation options
        return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
          if (err) {
            // Joi Error
            const JoiError = {
              status: 'failed',
              error: {
                original: err._object,
                // fetch only message and type from each error
                details: _.map(err.details, ({message, type}) => ({
                  message: message.replace(/['"]/g, ''),
                  type
                }))
              }
            };

            // Custom Error
            const CustomError = {
              status: 'failed',
              error: 'Invalid request data. Please review request and try again.'
            };

            // Send back the JSON error response
            res.status(422).json(_useJoiError ? JoiError : CustomError);
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data;
            next();
          }
        });
      }
    }
    next();
  };
};