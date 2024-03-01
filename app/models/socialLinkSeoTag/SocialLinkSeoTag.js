import mongoose from "mongoose";

const SocialLinkSeoTagSchema = new mongoose.Schema(
    {
        facebook: {
            type: String
        },
        instagram:{
            type:String
        },
        youtube:{
            type:String
        },
        whatsapp:{
            type:String
        },
        metaTitleTag:{
            type:String
        },
        metaKeyword:{
            type:String
        },
        metaDesc:{
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

const SocialLinkSeoTag = mongoose.models.SocialLinkSeoTag || mongoose.model('SocialLinkSeoTag', SocialLinkSeoTagSchema)

export default SocialLinkSeoTag;

