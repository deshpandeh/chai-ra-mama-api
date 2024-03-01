import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        menuName: {
            type: String
        },
        menuImage:{
            type:String
        },
        menuContent:{
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

const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema)

export default Menu;