import mongoose from "mongoose";

const SiteEnquirySchema = new mongoose.Schema(
    {
        contactName: {
            type: String
        },
        contactEmail: {
            type: String
        },
        contactSubject: {
            type: String
        },
        contactMessage: {
            type: String
        }
         
    }
)

const SiteEnquiry = mongoose.models.SiteEnquiry || mongoose.model('SiteEnquiry', SiteEnquirySchema)

export default SiteEnquiry;