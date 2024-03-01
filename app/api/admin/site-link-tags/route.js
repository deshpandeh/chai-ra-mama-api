
import SocialLinkSeoTag from "@/models/socialLinkSeoTag/SocialLinkSeoTag";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await SocialLinkSeoTag.findOne()
        
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting SocialLinkSeoTag Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        const {facebook,instagram,youtube,whatsapp,metaTitleTag,metaKeyword,metaDesc}= body
        await connectToDb();
        await SocialLinkSeoTag.create({facebook,instagram,youtube,whatsapp,metaTitleTag,metaKeyword,metaDesc})
        return NextResponse.json({
            message: "SocialLinkSeoTag Details added successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "error in adding SocialLinkSeoTag Details" + e
        }, { status: 500 })
    }
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const {_id,facebook,instagram,youtube,whatsapp,metaTitleTag,metaKeyword,metaDesc}= body
        await connectToDb();
        await SocialLinkSeoTag.findByIdAndUpdate(_id,{facebook,instagram,youtube,whatsapp,metaTitleTag,metaKeyword,metaDesc})
        return NextResponse.json({
            message:    "SocialLinkSeoTag Details updated successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Error in updating SocialLinkSeoTag Details` + e
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    try {
        const body = await request.json();
        const {_id}= body
        await connectToDb();
        await SocialLinkSeoTag.findByIdAndDelete(_id)
        return NextResponse.json({
            message: " SocialLinkSeoTag Details deleted successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Error in deleting SocialLinkSeoTag Details` + e
        }, { status: 500 })
    }
}

