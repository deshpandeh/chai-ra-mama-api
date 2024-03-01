import connectToDb from "@/utils/connectToDb";
import userSignUp from "@/models/admin/SignUp";
// import SignIn from "@/components/admin_SignIn/SignIn";
import { NextResponse } from "next/server";
const bcryptjs=require("bcryptjs")
import validator from "validator";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await userSignUp.find({role:{$ne:"admin"}},{email:1,firstName:1,lastName:1,_id:0,approval:1,role:1})
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
export async function POST(request, response) {
    try {

        const {firstName,lastName,email,password} = await request.json();
        await connectToDb();
        if (!validator.isEmail(email)) {
            return NextResponse.json({
                message: "Invalid Email",
                status:400
            }, { status: 400 })
        }
        const isEmailExist=await userSignUp.findOne({email:email})
        if(isEmailExist){
            return NextResponse.json({
                message:"User Already Exist",
                status:400
            },{ status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        await userSignUp.create({firstName,lastName,email,password:hashedPassword,approval:"Not Approved"})
        return NextResponse.json({
            message: "Sign Up Successfully",
            status:200
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in Sign Up",
            status:400
        }, { status: 400 })
    }
}
export async function PATCH(request) {
    try {
        const url = new URL(request.url)
        const _id = url.searchParams.get("id")
        const body = await request.json();
        await connectToDb();
        await userSignUp.findByIdAndUpdate({_id}, {$set:body})
        return NextResponse.json({
            message: "User details updated successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in updating User Details" + e
        }, { status: 500 })
    }
}
export async function DELETE(request, response) {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id")
        await connectToDb();
        await userSignUp.findByIdAndDelete(id)
        return NextResponse.json({
            message: "User details Deleted successfully",
        }, { status: 200 })
    } 
    catch (e) {
        return NextResponse.json({
            message: "Error in deleting User details" + e
        }, { status: 500 })
    }
}
