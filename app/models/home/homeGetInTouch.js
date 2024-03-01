import mongoose from "mongoose";

const homeGetInTouchSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message:{
            type:String,
            required:true
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
    },
    {
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    }
)
 
const homeGetInTouch = mongoose.models.homeGetInTouch || mongoose.model('homeGetInTouch', homeGetInTouchSchema)

export default homeGetInTouch;