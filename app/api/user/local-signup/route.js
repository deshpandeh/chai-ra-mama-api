import LocalUser from "@/models/user/Users";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
const bcryptjs=require("bcryptjs")
import validator from "validator";

export async function GET(request, response) {
    try {
        const url = new URL(request.url)
        const email = url.searchParams.get("email")
        await connectToDb();
        const data = await LocalUser.findOne({email},{_id:0,approveStatus:0,password:0,role:0,__v:0})
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

        const {firstName,lastName,email,password,role} = await request.json();
        await connectToDb();
        if (!validator.isEmail(email)) {
            return NextResponse.json({
                message: "Invalid Email",
                status:400
            }, { status: 400 })
        }
        const isEmailExist=await LocalUser.findOne({email:email})
        if(isEmailExist){
            return NextResponse.json({
                message:"User Already Exist",
                status:400
            },{ status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        await LocalUser.create({firstName,lastName,email,password:hashedPassword,approval:"Not Approved",role})
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
        const body = await request.json();
        const {email}=body
        await connectToDb();
        await LocalUser.findOneAndUpdate({email}, {$set:body})
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
        const body = await request.json();
        const {email}=body
        await connectToDb();
        await LocalUser.findOneAndDelete(email)
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
