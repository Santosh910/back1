import mongoose,{ Schema } from "mongoose";

const category = new Schema({
    name:String
})
export default mongoose.model('Category',category)