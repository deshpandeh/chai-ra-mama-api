import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
    {
        galleryTitle: {
            type: String,
            require: true,
        }, 
        galleryImage: {
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

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)

export default Gallery;