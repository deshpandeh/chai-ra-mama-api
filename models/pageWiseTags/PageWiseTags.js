import mongoose from "mongoose";

const PageWiseTagsSchema = new mongoose.Schema(
    {
        pageId: {
            type: String
        },
        metaTitle:{
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

const PageWiseTags = mongoose.models.PageWiseTags || mongoose.model('PageWiseTags', PageWiseTagsSchema)

export default PageWiseTags;