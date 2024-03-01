import mongoose from "mongoose";

const ClientProductCartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require:true
        },
        productId: {
            type: String,
            require:true
        },
        quantity:{
            type:Number,
            require:true,
            default:1
        },
        totalPrice:{
            type:Number,
            require:true,
            default:0
        },
        orderTime:{
            type:String,
            require:true
        },
        finalTime:{
            type:String,
            require:true
        },
        status:{
            type:String,
            required:true,
            default:"start",
            lowercase: true 
        },
        accepted:{
            type:String,
            required:true,
            default:"rejected",
            lowercase: true 
        },
        menuDetails:{
            type:Object,
            required:true,
            default:{}
        }
        
    }
)

const ClientProductCart = mongoose.models.ClientProductCart || mongoose.model('ClientProductCart', ClientProductCartSchema)

export default ClientProductCart;