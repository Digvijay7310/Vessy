import { body } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validateRequest(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}