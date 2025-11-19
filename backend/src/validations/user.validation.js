import Joi from "joi";

export const userRegisterSchema = Joi.object({
    fullName: 
    Joi.string()
    .min(3)
    .required()
    .messages({
        'string.empty': "FullName is required",
        'string.min': 'FullName must be atleast 3 character long'
    }),
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': "email is required"
    }),
    password: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
        "string.empty": "Password is required",
        'string.min': "Password must be atleast 3 character long"
    })
});

export const userLoginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': "email is required"
    }),
    password: Joi.string()
    .messages({
        "string.empty": "Password is required",
    })
})