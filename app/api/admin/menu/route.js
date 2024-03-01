import { adminReferenceGenerator, clientReferenceGenerator, deleteAdminMailTemplate, deleteClientMailTemplate, sendEmail, updateAdminMailTemplate, updateClientMailTemplate } from "@/mailer";
import ActionAuth from "@/models/actionAuth/ActionAuth";
import AdminSignUp from "@/models/admin/SignUp";
import Menu from "@/models/menu/Menu";
import SubMenu from "@/models/sub-menu/SubMenu";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await Menu.find({updateStatus:{$nin:["linked","unlinked"]}})
        data.sort((a, b) => a.menuName.localeCompare(b.menuName))

        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting Menu Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const { menuName, menuImage, menuContent } = body
        await connectToDb();
        await Menu.create({ menuName, menuImage, menuContent })
        return NextResponse.json({
            message: "Menu Details added successfully",
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
        const { _id, authId,menuName, menuImage, menuContent } = body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await Menu.findOne({ _id })
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
                const newData=await Menu.create({   menuName, menuImage, menuContent, updateStatus: "linked", productId: _id })
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

                await Menu.findByIdAndUpdate(_id, { updateStatus: "requested" })
                await ActionAuth.create({ clientRef: clientReference, adminRef: adminReference, productId: newData?._id, request: "updated", end_url: "menus" })

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
        const { _id, authId } = body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await Menu.findOne({ _id })
            if (isProductExist && isProductExist?.deleteStatus != "requested") {

                const client = process.env.CLIENT_ID
                const admin = process.env.ADMIN_ID

                const clientReference = clientReferenceGenerator.generateReference();
                const clientSubject = "Submitted: Approval for deleting Product"

                const adminReference = adminReferenceGenerator.generateReference();
                const adminSubject = "Recieved: request for deleting Product"

                const sender = process.env.MAILER_EMAIL

                const clientText = deleteClientMailTemplate({ client: "Client", clientReference, sender })
                const adminText = deleteAdminMailTemplate({ admin: "Admin", clientEmail: isAdminExist?.email, clientReference, adminReference, sender })

                sendEmail({ reciever: client, subject: clientSubject, text: clientText })
                sendEmail({ reciever: admin, subject: adminSubject, text: adminText })

                await Menu.findByIdAndUpdate(_id, { deleteStatus: "requested" })
                await ActionAuth.create({ clientRef: clientReference, adminRef: adminReference, productId: _id, request: "delete", end_url: "menus" })

                return NextResponse.json({
                    message: "Delete Request is sent to Admin, Please check your mail inbox.",
                }, { status: 200 })
            }
            else {
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

