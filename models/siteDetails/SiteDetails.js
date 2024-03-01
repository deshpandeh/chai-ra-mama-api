import mongoose from "mongoose";

const SiteDetailsSchema = new mongoose.Schema(
    {
        siteName: {
            type: String
        },
        sitePhone:{
            type:String 
        },
        siteEmail:{
            type:String
        },
        siteFromEmail:{
            type:String
        },
        siteForgetPassEmail:{
            type:String
        },
        siteCloseOn:{
            type:String
        },
        siteOpenHr:{
            type:String
        },
        siteLogo:{
            type:String
        },
        siteFavIcon:{
            type:String
        },
        siteAddress:{
            type:String
        },
        siteMap:{
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

const SiteDetails = mongoose.models.SiteDetails || mongoose.model('SiteDetails', SiteDetailsSchema)

export default SiteDetails;
