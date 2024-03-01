
import SiteDetails from "@/models/siteDetails/SiteDetails";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await SiteDetails.findOne()
        
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting SiteDetails Details" + e
        }, { status: 500 })
    }
}
export async function POST(request, response) {
    try {
        const body = await request.json();
        console.log(body)
        const {siteName,sitePhone,siteEmail,siteFromEmail,siteForgetPassEmail,siteCloseOn,siteOpenHr,siteLogo,siteFavIcon,siteAddress,siteMap}= body
        await connectToDb();
        await SiteDetails.create({siteName,sitePhone,siteEmail,siteFromEmail,siteForgetPassEmail,siteCloseOn,siteOpenHr,siteLogo,siteFavIcon,siteAddress,siteMap})
        return NextResponse.json({
            message: "SiteDetails Details added successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "error in adding SiteDetails Details" + e
        }, { status: 500 })
    }
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const {_id,siteName,sitePhone,siteEmail,siteFromEmail,siteForgetPassEmail,siteCloseOn,siteOpenHr,siteLogo,siteFavIcon,siteAddress,siteMap}= body
        await connectToDb();
        await SiteDetails.findByIdAndUpdate(_id,{siteName,sitePhone,siteEmail,siteFromEmail,siteForgetPassEmail,siteCloseOn,siteOpenHr,siteLogo,siteFavIcon,siteAddress,siteMap})
        return NextResponse.json({
            message:    "SiteDetails Details updated successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Error in updating SiteDetails Details` + e
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    try {
        const body = await request.json();
        const {_id}= body
        await connectToDb();
        await SiteDetails.findByIdAndDelete(_id)
        return NextResponse.json({
            message: " SiteDetails Details deleted successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Error in deleting SiteDetails Details` + e
        }, { status: 500 })
    }
}

