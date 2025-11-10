import { body } from "express-validator";

export const registerValidator = [
    body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min: 3})
    .withMessage("Name must be at least 3 character long"),

    body("email")
    .isEmail()
    .withMessage("Valid email is required"),

    body("password")
    .isLength({min: 3})
    .withMessage("Password must be al least 3 character long")
]

export const loginValidator = [
    body("email")
    .isEmail()
    .withMessage("Valid email is required"),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
    
]