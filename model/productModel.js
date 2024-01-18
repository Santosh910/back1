import mongoose, { Schema } from "mongoose";

const product = new Schema({
    name : String,
    price:Number,
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
    
    
})

export default mongoose.model('Product',product)
