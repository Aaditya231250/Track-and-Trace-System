import mongoose from "mongoose";

const relationSchema = new mongoose.Schema({
    product_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    distrbutors_id: [{
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

