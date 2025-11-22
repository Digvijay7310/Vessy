import Joi from "joi";


export const userRegisterSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.empty': "FullName is required",
            'string.min': 'FullName must be at least 3 characters long'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': "Email is required"
        }),
    password: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "Password is required",
            'string.min': "Password must be at least 3 characters long"
        }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be 10 digits"
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