import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
import Header from "@/models/headers/Header";
import AdminSignUp from "@/models/admin/SignUp";
import { adminReferenceGenerator, clientReferenceGenerator, sendEmail, updateAdminMailTemplate, updateClientMailTemplate } from "@/mailer";
import ActionAuth from "@/models/actionAuth/ActionAuth";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await Header.find({updateStatus:{$nin:["linked","unlinked"]}})
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting Header Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const {headerTitle,headerImage}= body
        await connectToDb();
        await Header.create({headerTitle,headerImage})
        return NextResponse.json({
            message: "Header Details added successfully",
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
        const {_id,authId,headerImage}= body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await Header.findOne({ _id })
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
                const newData=await Header.create({  headerImage, headerTitle:isProductExist?.headerTitle,updateStatus: "linked", productId: _id })
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

                await Header.findByIdAndUpdate(_id, { updateStatus: "requested" })
                await ActionAuth.create({ clientRef: clientReference, adminRef: adminReference, productId: newData?._id, request: "updated", end_url: "headers" })

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
// export async function DELETE(request) {
//     try {
//         const body = await request.json();
//         const {_id}= body
//         await connectToDb();
//         await Header.findByIdAndDelete(_id)
//         return NextResponse.json({
//             message: " Header Details deleted successfully",
//         }, { status: 200 })
//     }
//     catch (e) {
//         return NextResponse.json({
//             message: `Error in deleting Header Details` + e
//         }, { status: 500 })
//     }
// }

