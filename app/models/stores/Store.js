import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        parentId: {
            type: String
        },
        storeAddress: {
            type: String
        },
        storePhone: {
            type: String
        },
        storeMap: { 
            type: String
        },
        deleteStatus:{
            type:String,
            default:"none"
        },
        updateStatus:{
            type:String,
            default:"none"
        },
        productId:{
            type:String,
            default:"none"
        }
         
    }
)

const Store = mongoose.models.Store || mongoose.model('Store', StoreSchema)

export default Store;