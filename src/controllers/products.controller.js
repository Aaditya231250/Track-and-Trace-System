import { asyncHandler } from "../utils/AsyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { Product } from "../models/products.models.js";
import { ApiResponse } from "../utils/APIResponse.js";


const registerProduct = asyncHandler(async (req, res) => {
    const {name, details, barcode_data} = req.body;

    if (
        [name, details, barcode_data].some((field) => field?.trim() === "")
    ) {
        throw new APIError(400, "All fields are required")
    }

    const existingProduct = await Product.findOne({name});
    if (existingProduct) {
        throw new APIError(400, "Product already exists");
    }

    const product = await Product.create({
        name,
        details,
        barcode_data
    })
    res.status(201).json(new ApiResponse(201, "Product registered successfully", product));

})

export { registerProduct }