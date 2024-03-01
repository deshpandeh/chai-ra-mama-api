import connectToDb from "@/utils/connectToDb";
import SignUp from "@/models/admin/SignUp";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserLogs from "@/models/userLogs/UserLogs";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = (await UserLogs.find()).reverse()
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting UserLogs details" + e
        }, { status: 500 })
    }
}

export async function POST(request) {
    try {
    
        const reqBody = await request.json()
        const {email, password} = reqBody;
        await connectToDb()
        const user = await SignUp.findOne({email})
        if(!user){
            return NextResponse.json({
                message: "Invalid Credential",
            }, { status: 400 })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                message: "Invalid Credential",
            }, { status: 400 })
        }
        if(user?.approval!="approved"){
            return NextResponse.json({
                message: "User details are not approved",
            }, { status: 400 })
        }
        await UserLogs.create({userName:user?.firstName+user?.lastName,userEmail:email,time:new Date()})
        const tokenData = {
            id: user._id,
            name: user.firstName+user.lastName,
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Sign In successful",
            token:token,
            status: 200,

        })
        return response;

    } catch (error) {
        return NextResponse.json({
            message: "Error in Sign In" + error
        }, { status: 500 })
    }
}