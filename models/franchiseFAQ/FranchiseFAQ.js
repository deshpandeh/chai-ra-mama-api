import mongoose from "mongoose";

const FranchiseFAQSchema = new mongoose.Schema(
    { 
        faqQuestion: {
            type: String,
            default:"",
            require:true
        },
        faqAnswer: {
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

const FranchiseFAQ = mongoose.models.FranchiseFAQ || mongoose.model('FranchiseFAQ', FranchiseFAQSchema)

export default FranchiseFAQ;