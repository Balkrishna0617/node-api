import Joi from 'joi';

export const AddEmployeeSchema = Joi.object().keys({
    FirstName: Joi.string().regex(/^[A-Za-z]+$/).required(),
    LastName: Joi.string().regex(/^[A-Za-z]+$/).required(),
});
