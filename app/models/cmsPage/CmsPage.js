import mongoose from "mongoose";

const CmsPageSchema = new mongoose.Schema(
    {
        cmsId: {
            type: String,
            require: true,
            unique: true
        },
        cmsHeading: {
            type: String,
            require: true,
            default:""
        },
        cmsImage: {
            type: String,
            require: true,
            default:""
        },
        cmsContent: {
            type: String,
            require: true,
            default:""
        },
        status:{
            type:String,
            require:true,
            default:"None"
        }
        ,
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

const CmsPage = mongoose.models.CmsPage || mongoose.model('CmsPage', CmsPageSchema)

export default CmsPage;