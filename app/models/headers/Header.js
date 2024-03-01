import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema(
    {
        headerTitle: {
            type: String,
            require: true,
        }, 
        headerImage: {
            type: String,
            default:""
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

const Header = mongoose.models.Header || mongoose.model('Header', HeaderSchema)

export default Header;