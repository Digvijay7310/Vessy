import { body } from "express-validator";

export const createProductValidator = [
    body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({min: 3})
    .withMessage("Product name must be at least 3 characters"),

    body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({min: 10})
    .withMessage("Description must be at least 10 characters"),

    body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

    body("category")
    .notEmpty()
    .withMessage("Category is required")
]