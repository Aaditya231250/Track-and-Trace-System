import { asyncHandler } from "../utils/AsyncHandler";
import { APIError } from "../utils/APIError";
import { Client } from "../models/clients.models";
import { ApiResponse } from "../utils/APIResponse";
import { Distributor } from "../models/distributors.models";
import { Retailer } from "../models/retailers.models";
import { Product } from "../models/products.models";
import { Relation } from "../models/relations.models";

const createRelation = asyncHandler(async (req, res)=>{
    const {client_name, distributor_names} = req.body

    const client = await Client.findOne({client_name})

    const distributors = await Promise.all(

        distributor_names.map(async (distributor_name)=>{

            const distributor = await Distributor.findOne({distributor_name})

            if (!distributor) {
                throw new APIError(404, `Distributor not found`);
            }

            return distributor._id
        })
    )
    
    const relation = await Relation.create({
        product_id: product._id,
        distributor_id: distributors
    });

    res.status(201).json(new ApiResponse(201, "Relation created successfully", relation));
})

export { createRelation }