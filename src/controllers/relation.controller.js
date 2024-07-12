import { asyncHandler } from "../utils/AsyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { Client } from "../models/clients.models.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { Distributor } from "../models/distributors.models.js";
import { Retailer } from "../models/retailers.models.js";
import { Product } from "../models/products.models.js";
import { Relation } from "../models/relations.models.js";

const createRelation = asyncHandler(async (req, res)=>{
    const {client_name, distributor_names, retailer_names, product_name} = req.body

    const client = await Client.findOne({name : client_name})

    if(!client){
        throw new APIError(404, `Client not found`);
    }

    const distributors = await Promise.all(

        distributor_names.map(async (distributor_name)=>{

            const distributor = await Distributor.findOne({name : distributor_name})

            if (!distributor) {
                throw new APIError(404, `Distributor not found`);
            }

            return distributor._id
        })
    )

    const retailers = await Promise.all(

        retailer_names.map(async (retailer_name)=>{

            const retailer = await Retailer.findOne({name : retailer_name})

            if (!retailer) {
                throw new APIError(404, `Retailer not found`);
            }

            return retailer._id
        })
    )

    const product = await Product.findOne({name : product_name})

    if(!product){
        throw new APIError(404, `Product not found`);
    }
    
    const relation = await Relation.create({
        client_id: client._id,
        distributor_id: distributors,
        retailer_id: retailers,
        product_id: product._id
    });


    res.status(201).json(new ApiResponse(201, "Relation created successfully", relation));
})

export { createRelation }