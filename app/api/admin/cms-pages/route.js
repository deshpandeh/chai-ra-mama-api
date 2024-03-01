import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
import CmsPage from "@/models/cmsPage/CmsPage";
import AdminSignUp from "@/models/admin/SignUp";
import { adminReferenceGenerator, clientReferenceGenerator, sendEmail, updateAdminMailTemplate, updateClientMailTemplate } from "@/mailer";
import ActionAuth from "@/models/actionAuth/ActionAuth";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await CmsPage.find({ updateStatus: { $nin: ["linked", "unlinked"] } })
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting CMS Page Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const { cmsId, cmsHeading, cmsImage, cmsContent } = body
        await connectToDb();
        await CmsPage.create({ cmsId, cmsHeading, cmsImage, cmsContent })
        return NextResponse.json({
            message: "CMS Id added successfully",
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
        const { _id, authId,cmsHeading, cmsImage, cmsContent, status } = body
        await connectToDb();
        const isAdminExist = await AdminSignUp.findOne({ email: authId?.id })
        if (isAdminExist) {
            const isProductExist = await CmsPage.findOne({ _id })
            if (isProductExist && isProductExist?.deleteStatus == "requested") {
                return NextResponse.json({
                    message: "Can't Proceed with update request, because Delete Request already exist for this Items.",
                }, { status: 200 })
            }
            if (isProductExist && isProductExist?.updateStatus == "requested") {
                return NextResponse.json({
                    message: "Update Request already exist \nfor this Items.",
                }, { status: 200 })
            }
            if (isProductExist && isProductExist?.updateStatus == "none") {
                const newData = await CmsPage.create({ cmsId:isProductExist?.cmsId+Math.random(10000),cmsHeading, cmsImage, cmsContent, updateStatus: "linked", productId: _id })
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
                await CmsPage.findByIdAndUpdate(_id, { updateStatus: "requested" })
                await ActionAuth.create({ clientRef: clientReference, adminRef: adminReference, productId: newData?._id, request: "updated", end_url: "cmspages" })

                return NextResponse.json({
                    message: "Update Request is sent to Admin, Please check your mail inbox.",
                }, { status: 200 })
            }

        }
        return NextResponse.json({
            message: "Oops..! Something went wrong",
            status:400
        }, { status: 400 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Internal Server Error`,
            status:500
        }, { status: 500 })
    }
}
// export async function DELETE(request) {
//     try {
//         const body = await request.json();
//         const { _id } = body
//         await connectToDb();
//         await CmsPage.findByIdAndDelete(_id)
//         return NextResponse.json({
//             message: " Details deleted successfully",
//         }, { status: 200 })
//     }
//     catch (e) {
//         return NextResponse.json({
//             message: `Error in deleting CMS Details` + e
//         }, { status: 500 })
//     }
// }

