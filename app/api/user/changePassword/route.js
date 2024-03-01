import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
import LocalUser from "@/models/user/Users";
const bcryptjs = require("bcryptjs")

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { _id,password, newPassword } =body;
        const user=await LocalUser.findOne({email:_id})
        if(!user){
            return NextResponse.json({
                message: "Opps! Something went wrong",
            }, { status: 400 })
        } 
        await connectToDb();
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid Old Password" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        await LocalUser.findOneAndUpdate({email: _id }, { $set: {password:hashedPassword} })
        return NextResponse.json({
            message: "password updated successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in updating password" + e
        }, { status: 500 })
    }
}
