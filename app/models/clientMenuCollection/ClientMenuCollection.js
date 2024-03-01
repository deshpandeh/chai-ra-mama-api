import mongoose from "mongoose";

const ClientMenuCollectionSchema = new mongoose.Schema(
    {
        clientMenuName: {
            type: String
        },
        productId:{
            type:String
        },
        clientMenuImage:{
            type:String
        },
        clientMenuPrice:{
            type:String
        },
        quantity:{
            type:String 
        }
    }
)

const ClientMenuCollection = mongoose.models.ClientMenuCollection || mongoose.model('ClientMenuCollection', ClientMenuCollectionSchema)

export default ClientMenuCollection;