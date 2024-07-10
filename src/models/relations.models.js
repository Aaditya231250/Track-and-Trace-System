import mongoose from "mongoose";

const relationSchema = new mongoose.Schema({
    product_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    distrbutor_id: [{
        type: Schema.Types.ObjectId, 
        ref: 'Distributor',
    }],
    retailer_id: [{
        type: Schema.Types.ObjectId, 
        ref: 'Retailer',
    }],
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
}, {timestamps:true}
)

const Relation = mongoose.model('Relation', relationSchema)

export { Relation }
