import mongoose from "mongoose";

const StoreInchargeSchema = new mongoose.Schema(
    {
        storeId: {
            type: String,
            require:true 
        },
        inchargeName: {
            type: String
        },
        inchargeEmail: {
            type: String
        },
        
        inchargePhone: {
            type: String
        },
        storeDetails:{
            type:Object
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

const StoreIncharge = mongoose.models.StoreIncharge || mongoose.model('StoreIncharge', StoreInchargeSchema)

export default StoreIncharge;