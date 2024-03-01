
import { adminReferenceGenerator, clientReferenceGenerator, deleteAdminMailTemplate, deleteClientMailTemplate, sendEmail, updateAdminMailTemplate, updateClientMailTemplate } from "@/mailer";
import ActionAuth from "@/models/actionAuth/ActionAuth";
import AdminSignUp from "@/models/admin/SignUp";
import ClientMenu from "@/models/clientMenu/ClientMenu";
import ClientMenuCollection from "@/models/clientMenuCollection/ClientMenuCollection";
import LocalUser from "@/models/user/Users";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
const url = require('url');
export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await ClientMenuCollection.find()
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting SubMenu Details" + e
        }, { status: 500})
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const {_id,quantity,userEmail}= body
        console.log(body)
        await connectToDb();
        const isUserExist=await LocalUser.findOne({email:userEmail})
        if(!isUserExist){
            return NextResponse.json({
                message: "Invalid request",
            }, { status: 200 })
        }
        const isMenuExistInCollection= await ClientMenuCollection.findOne({productId:_id})
        if (isMenuExistInCollection){
            return NextResponse.json({
                message: "This Item already exist in you collection",
            }, { status: 200 })
        }
        const isMenuExist= await ClientMenu.findById(_id)
        if (isMenuExist){
            const {clientMenuName,clientMenuImage,clientMenuPrice}=isMenuExist
            await ClientMenuCollection.create({clientMenuName,clientMenuImage,clientMenuPrice,quantity,productId:_id})
            return NextResponse.json({
                message: "Added to Collection",
            }, { status: 200 })
        }
        return NextResponse.json({
            message: "Unable to save this product right now.",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`+e,
        }, { status: 500 })
    }
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const {_id,quantity,userEmail}= body
        await connectToDb();
    
        const isUserExist=await LocalUser.findOne({email:userEmail})
        if(!isUserExist){
            return NextResponse.json({
                message: "Invalid request",
            }, { status: 200 })
        }
        await ClientMenuCollection.findByIdAndUpdate({_id},{$set:{"quantity":quantity}})

        return NextResponse.json({
            message: "Quanity updated successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`,
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { _id, userEmail} = body
        await connectToDb();
        const isUserExist=await LocalUser.findOne({email:userEmail})
        if(!isUserExist){
            return NextResponse.json({
                message: "Invalid request",
            }, { status: 200 })
        }
        await ClientMenuCollection.findByIdAndDelete(_id)
        return NextResponse.json({
            message: "Item removed from collection successfully",
        }, { status: 200 })
    } 
    
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`,
        }, { status: 500 })
    }
}

