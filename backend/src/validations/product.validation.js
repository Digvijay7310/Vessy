import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .required()
    .messages({
        "string.empty": "Minimum 3 character"
    }),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    description: Joi.string()
    .min(3)
    .required()
    .messages({
        'string.empty': 'minimim 3 charctet long'
    })
})
