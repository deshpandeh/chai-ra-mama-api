import mongoose from "mongoose";

const ClientFeedbackSchema = new mongoose.Schema(
    {
        
        clientName: {
            type: String,
            default:"",
            require:true
        },
        clientImage: {
            type: String,
            default:"",
            require:true
        },
        clientComment: {
            type: String,
            default:"", 
            require:true
        },
        clientDesignation: {
            type: String,
            default:"", 
            require:true
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

const ClientFeedback = mongoose.models.ClientFeedback || mongoose.model('ClientFeedback', ClientFeedbackSchema)

export default ClientFeedback;