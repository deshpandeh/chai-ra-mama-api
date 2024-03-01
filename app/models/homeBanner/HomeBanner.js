import mongoose from "mongoose";

const HomePageBannerSchema = new mongoose.Schema(
    {
        
        bannerImage: {
            type: String,
            default:"",
            require:true
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

const HomePageBanner = mongoose.models.HomePageBanner || mongoose.model('HomePageBanner', HomePageBannerSchema)

export default HomePageBanner;