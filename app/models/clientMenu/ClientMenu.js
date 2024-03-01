import mongoose from "mongoose";

const ClientMenuSchema = new mongoose.Schema(
    {
        clientMenuName: {
            type: String
        },
        clientMenuImage:{
            type:String
        },
        clientMenuPrice:{
            type:String
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

const ClientMenu = mongoose.models.ClientMenu || mongoose.model('ClientMenu', ClientMenuSchema)

export default ClientMenu;