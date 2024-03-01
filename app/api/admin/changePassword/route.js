import connectToDb from "@/utils/connectToDb";
import AdminSignUp from "@/models/admin/SignUp";
import { NextResponse } from "next/server";
const bcryptjs = require("bcryptjs")

export async function PATCH(request) {
    try {
        const body = await request.json();
        console.log(body)
        const { _id,password, newPassword } =body;
        const user=await AdminSignUp.findOne({email:_id})
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

        await AdminSignUp.findOneAndUpdate({email: _id }, { $set: {password:hashedPassword} })
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
