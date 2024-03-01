import mongoose from "mongoose";

const StoreInchargeRequestSchema = new mongoose.Schema(
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
        isApproved:{
            type:String,
            default:"none"
        }
         
    }
)

const StoreInchargeRequest = mongoose.models.StoreInchargeRequest || mongoose.model('StoreInchargeRequest', StoreInchargeRequestSchema)

export default StoreInchargeRequest;