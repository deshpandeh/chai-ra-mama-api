import mongoose from "mongoose";

const StoreLocatorSchema = new mongoose.Schema(
    {
        storeCity: {
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

const StoreLocator = mongoose.models.StoreLocator || mongoose.model('StoreLocator', StoreLocatorSchema)

export default StoreLocator;