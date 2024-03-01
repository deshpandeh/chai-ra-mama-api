import mongoose from "mongoose";

const LocalUserSchema = new mongoose.Schema(
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
        contactNumber:{
            type:String
        },
        address:{
            type:String
        },
        role:{
            type:String,
            default:"user",
            require:true
        },
        approveStatus:{
            type:"String",
            require:true,
            default:"none"
        }
        
    }
)

const LocalUser = mongoose.models.LocalUser || mongoose.model('LocalUser', LocalUserSchema)

export default LocalUser;