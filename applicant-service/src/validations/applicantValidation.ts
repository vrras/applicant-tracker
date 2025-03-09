import Joi from 'joi';

export const createApplicantValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  yoe: Joi.number().min(0).required(),
  role: Joi.string().min(2).max(100).required(),
  location: Joi.string().min(3).max(200).required(),
  resumeUrl: Joi.string().uri().required(),
});