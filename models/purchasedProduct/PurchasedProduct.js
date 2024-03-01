import mongoose from "mongoose";

const PurchasedProductSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require:true
        },
        userDetails:{
            type: Object,
            require:true,
            default:{}
        },
        productDetails: {
            type: Array, 
            require:true
        },
        amount:{
            type:String,
            require:true
        },
        activeStatus:{
            type:String,
            required:true,
            lowercase:true,
            default:"start"
        }, 
        start:{
            type:Object,
            required:true,
            default:{status:false,time:""},
        },
        payment:{
            type:Object,
            required:true,
            default:{status:false,time:""},
        },
        orderPlaced:{
            type:Object,
            required:true,
            default:{status:false,time:""},
        },
        
        delivered:{
            type:Object,
            required:true,
            default:{status:false,time:""},
        },
        completed:{
            type:Object,
            required:true,
            default:{status:false,time:""},
        }
        
    }
)

const PurchasedProduct = mongoose.models.PurchasedProduct || mongoose.model('PurchasedProduct', PurchasedProductSchema)

export default PurchasedProduct;