import connectToDb from "@/utils/connectToDb";
import AdminSignUp from "@/models/admin/SignUp";
// import SignIn from "@/components/admin_SignIn/SignIn";
import { NextResponse } from "next/server";
const bcryptjs=require("bcryptjs")
import validator from "validator";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await AdminSignUp.find({},{email:1,firstName:1,lastName:1,_id:0,approval:1})
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting user details" + e
        }, { status: 500 })
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const {email,status}=body
        await connectToDb();
        const user=await AdminSignUp.findOne({email})
        await AdminSignUp.findOneAndUpdate({email}, {approval:status})
        let msg=" user rejected successfully"
        if(status=="approved"){
            msg="user approved successfully"
        }
        return NextResponse.json({
            message: msg,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in updating User approval" + e
        }, { status: 500 })
    }
}
