import mongoose from "mongoose";

const ActionAuthSchema = new mongoose.Schema(
    {
        clientRef: {
            type: String,
            require: true
        },
        adminRef: {
            type: String,
            require: true
        },
        productId: {
            type: String,
            require: true
        },
        request: {
            type: String,
            require: true,
            default:"none"
        },
        updateId:{
            type: String,
            require: true,
            default:""
        },
        end_url:{
            type: String,
            require: true,
            default:""
        }
    }
)

const ActionAuth = mongoose.models.ActionAuth || mongoose.model('ActionAuth', ActionAuthSchema)

export default ActionAuth;