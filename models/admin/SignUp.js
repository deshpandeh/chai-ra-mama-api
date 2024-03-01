import mongoose from "mongoose";

const AdminSignUpSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require:true
        },
        lastName: {
            type: String,
            require:true
        },
        password: {
            type: String,
            require:true
        },
        email: {
            type: String,
            unique:true,
            require:true
        },
        approval:{
            type:String,
            default:"Not approved"
        },
        role:{
            type:String,
            default:"staff"
        }
        
    },
    {
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    }
)

const AdminSignUp = mongoose.models.AdminSignUp || mongoose.model('AdminSignUp', AdminSignUpSchema)

export default AdminSignUp;