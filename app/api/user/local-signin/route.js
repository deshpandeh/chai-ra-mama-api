import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LocalUser from "@/models/user/Users";
export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { email, password, role } = reqBody;
        await connectToDb()
        const user = await LocalUser.findOne({ email })
        if (!user) {
            return NextResponse.json({
                message: "Invalid Credential",
            }, { status: 400 })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid Credential",
            }, { status: 400 })
        }
        
        if (role == "client" && user?.role == "user") {
            return NextResponse.json({
                message: "Invalid Credential",
            }, { status: 400 })
        }
        if (role == "user" && user?.role == "client") {
            return NextResponse.json({
                message: "Invalid Credential",
            }, { status: 400 })
        }
        if (role == "client" && user?.approveStatus == "none") {
            return NextResponse.json({
                message: "Your approval is pending. Please send request to admin for approval.",
            }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            name: user.firstName + user.lastName,
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "Sign In successful",
            token: token,
            status: 200,

        })
        return response;

    } catch (error) {
        return NextResponse.json({
            message: "Error in Sign In" + error
        }, { status: 500 })
    }
}