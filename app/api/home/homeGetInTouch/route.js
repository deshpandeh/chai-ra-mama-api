import connectToDb from "@/utils/connectToDb";
import homeGetInTouch from "@/models/home/homeGetInTouch";
import { NextResponse } from "next/server";
import validator from "validator";
export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await homeGetInTouch.find()
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting Message" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {

        const body = await request.json();
        const{firstName, lastName, email, message}=body;
        if (!validator.isEmail(email)) {
            return NextResponse.json({
                message: "Invalid Email",
                status:400
            }, { status: 400 })
        }
        await connectToDb();
        await homeGetInTouch.create({firstName, lastName, email, message})
        return NextResponse.json({
            message: "Message sent successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in sending Message" + e
        }, { status: 500 })
    }
}
// export async function PATCH(request) {
//     try {
//         const url = new URL(request.url)
//         const id = url.searchParams.get("id")
//         const body = await request.json();
//         await connectToDb();
//         await homeGetInTouch.findByIdAndUpdate(id, body)
//         return NextResponse.json({
//             message: "homeGetInTouch details updated successfully",
//         }, { status: 200 })
//     }
//     catch (e) {
//         return NextResponse.json({
//             message: "Error in updating homeGetInTouch Details" + e
//         }, { status: 500 })
//     }
// }
export async function DELETE(request, response) {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id")
        await connectToDb();
        await homeGetInTouch.findByIdAndDelete(id)
        return NextResponse.json({
            message: "Message Deleted successfully",
        }, { status: 200 })
    } 
    catch (e) {
        return NextResponse.json({
            message: "Error in deleting Message" + e
        }, { status: 500 })
    }
}
