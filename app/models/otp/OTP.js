import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require:true
        },
        orderId: {
            type: String,
            require:true
        },
        otp: {
            type: String,
            require:true
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 5 * 60 * 1000),
            index: { expires: '5m' },
            require:true
        }   
    }
)

const OTP = mongoose.models.OTP || mongoose.model('OTP', OTPSchema)

export default OTP;