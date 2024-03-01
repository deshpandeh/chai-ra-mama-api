import mongoose from "mongoose";

const SubMenuSchema = new mongoose.Schema(
    {
        parentId: {
            type: String
        },
        itemPrice: {
            type: String
        },
        itemName: {
            type: String
        },
        itemImage: {
            type: String
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

const SubMenu = mongoose.models.SubMenu || mongoose.model('SubMenu', SubMenuSchema)

export default SubMenu;