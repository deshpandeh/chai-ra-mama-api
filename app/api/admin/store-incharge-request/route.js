import { adminReferenceGenerator, clientReferenceGenerator, deleteAdminMailTemplate, deleteClientMailTemplate, sendEmail, updateAdminMailTemplate, updateClientMailTemplate } from "@/mailer";
import ActionAuth from "@/models/actionAuth/ActionAuth";
import AdminSignUp from "@/models/admin/SignUp";
import StoreIncharge from "@/models/storeIncharge/StoreIncharge";
import StoreInchargeRequest from "@/models/storeInchargeRequest/StoreInchargeRequest";
import Store from "@/models/stores/Store";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
const url = require('url');
export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await StoreInchargeRequest.find({isApproved:"none"})
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting StoreInchargeRequest Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const { storeId, inchargeName, inchargeEmail, inchargePhone } = body
        await connectToDb();
        const isStoreExist = await Store.findOne({ _id: storeId })
        if (!isStoreExist) {
            return NextResponse.json({
                message: "Store Does not Exist"
            }, { status: 400 })
        }
        const isReqExist=await StoreInchargeRequest.findOne({storeId,inchargeEmail})
        if(isReqExist){
            return NextResponse.json({
                message: "This Request Already Exist"
            }, { status: 200 })
        }
        await StoreInchargeRequest.create({ storeId, inchargeName, inchargeEmail, inchargePhone, storeDetails: isStoreExist })
        return NextResponse.json({
            message: "StoreIncharge Request Details added successfully",
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
        const { _id,authId} = body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await StoreInchargeRequest.findOne({ _id })
            // console.log(isProductExist)
            if (isProductExist) {
                const {storeId, inchargeName, inchargeEmail, inchargePhone, storeDetails }=isProductExist
                await StoreInchargeRequest.findByIdAndUpdate(_id,{isApproved:"approved"})
                await StoreIncharge.create({ storeId, inchargeName, inchargeEmail, inchargePhone, storeDetails})
                return NextResponse.json({
                    message: "Request Approved Successfully",
                }, { status: 200 })
            }
            
        }
        return NextResponse.json({
            message: "Ooops! Something went wrong",
        }, { status: 400 })
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
        const { _id, authId } = body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await StoreInchargeRequest.findOne({ _id })
            if (isProductExist) {
                await StoreInchargeRequest.findByIdAndDelete({_id})
                return NextResponse.json({
                    message: "Request rejected successfully",
                }, { status: 200 })
            }
            else {
                return NextResponse.json({
                    message: "Oops! Something went wrong"
                }, { status: 500 })
            }
        }
        return NextResponse.json({
            message: "Ooops! Something went wrong"
        }, { status: 400 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`,
        }, { status: 500 })
    }
}

