import { adminReferenceGenerator, clientReferenceGenerator, deleteAdminMailTemplate, deleteClientMailTemplate, sendEmail, updateAdminMailTemplate, updateClientMailTemplate } from "@/mailer";
import ActionAuth from "@/models/actionAuth/ActionAuth";
import AdminSignUp from "@/models/admin/SignUp";
import Store from "@/models/stores/Store";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
const url = require('url');
export async function GET(request, response) {
    try {
        const { _id } = url.parse(request.url, true).query;
        await connectToDb();
        const data = await Store.find({parentId:_id,updateStatus:{$nin:["linked","unlinked"]}})
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting Store Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const {parentId,storeAddress,storeMap,storePhone}= body
        await connectToDb();
        await Store.create({parentId,storeAddress,storeMap,storePhone})
        return NextResponse.json({
            message: "Store Details added successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`,
        }, { status: 500 })
    }
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const {_id,authId,storeAddress,storeMap,storePhone}= body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await Store.findOne({ _id })
            if (isProductExist && isProductExist?.deleteStatus == "requested") {
                return NextResponse.json({
                    message: "Can't Proceed with update request, because Delete Request already exist for this Items.",
                }, { status: 200 })
            }
            if (isProductExist && isProductExist?.updateStatus == "requested") {
                return NextResponse.json({
                    message: "Update Request already exist for this Items.",
                }, { status: 200 })
            }
            if (isProductExist && isProductExist?.updateStatus == "none") {
                const newData=await Store.create({ storeAddress,storeMap,storePhone, updateStatus: "linked", productId: _id })
                const client = process.env.CLIENT_ID
                const admin = process.env.ADMIN_ID

                const clientReference = clientReferenceGenerator.generateReference();
                const clientSubject = "Submitted: Approval for Updating Product"

                const adminReference = adminReferenceGenerator.generateReference();
                const adminSubject = "Recieved: request for Updating Product"

                const sender = process.env.MAILER_EMAIL

                const clientText = updateClientMailTemplate({ client: "Client", clientReference, sender })
                const adminText = updateAdminMailTemplate({ admin: "Admin", clientEmail: isAdminExist?.email, clientReference, adminReference, sender })

                sendEmail({ reciever: client, subject: clientSubject, text: clientText })
                sendEmail({ reciever: admin, subject: adminSubject, text: adminText })

                await Store.findByIdAndUpdate(_id, { updateStatus: "requested" })
                await ActionAuth.create({ clientRef: clientReference, adminRef: adminReference, productId: newData?._id, request: "updated", end_url: "stores" })

                return NextResponse.json({
                    message: "Update Request is sent to Admin, Please check your mail inbox.",
                }, { status: 200 })
            }

        }
        return NextResponse.json({
            message: "Oops..! Something went wrong",
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
        const { _id, authId} = body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await Store.findOne({ _id })
            if (isProductExist && isProductExist?.deleteStatus!="requested") {
            
            const client = process.env.CLIENT_ID
            const admin = process.env.ADMIN_ID

            const clientReference = clientReferenceGenerator.generateReference();
            const clientSubject = "Submitted: Approval for deleting Product"

            const adminReference = adminReferenceGenerator.generateReference();
            const adminSubject = "Recieved: request for deleting Product"
            
            const sender=process.env.MAILER_EMAIL

            const clientText = deleteClientMailTemplate({client:"Client",clientReference,sender})
            const adminText = deleteAdminMailTemplate({ admin:"Admin",clientEmail:isAdminExist?.email, clientReference, adminReference,sender })
           
            sendEmail({ reciever: client, subject: clientSubject, text: clientText })
            sendEmail({ reciever: admin, subject: adminSubject, text: adminText })

            await Store.findByIdAndUpdate(_id, { deleteStatus: "requested" })
            await ActionAuth.create({clientRef:clientReference,adminRef:adminReference,productId:_id,request:"delete",end_url:"stores"})

            return NextResponse.json({
                message: "Delete Request is sent to Admin, Please check your mail inbox.",
            }, { status: 200 })
        }
        else{
            return NextResponse.json({
                message: "Delete request already exist for this item"
            }, { status: 500 })
        }
        }
        return NextResponse.json({
            message: "Ooops! Something went wrong"
        }, { status: 500 })
    } 
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`,
        }, { status: 500 })
    }
}

