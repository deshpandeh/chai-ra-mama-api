import connectToDb from "@/utils/connectToDb";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import LocalUser from "@/models/user/Users";
export async function POST(request) {
    try { 
        const reqBody = await request.json()
        const {token} = reqBody; 
        if(!token){
            return NextResponse.json({
                message: "token doesn't exist",
            }, { status: 200 })
        }
        const VerifyUser=jwt.verify(token,process.env.TOKEN_SECRET)
        await connectToDb()
        const rootUser=await LocalUser.findOne({_id:VerifyUser.id})
        if(!rootUser){ 
            return NextResponse.json({
                message: null,
            }, { status: 200 })
        }
        let userId=rootUser.email
        return NextResponse.json({
            id: userId,
            role:rootUser?.role
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in user Auth" + e
        }, { status: 500 })
    }
}
  