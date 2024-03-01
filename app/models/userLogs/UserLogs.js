import mongoose from "mongoose";
const offset = 6 * 60 * 60 * 1000;
const UserLogsSchema = new mongoose.Schema(
    {
        userName:{
            type:String
        },
        userEmail:{
            type:String
        },
        time:{
            type:String
        }
    }
)

const UserLogs = mongoose.models.UserLogs || mongoose.model('UserLogs', UserLogsSchema)

export default UserLogs;