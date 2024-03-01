
import SiteDetails from "@/models/siteDetails/SiteDetails";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await SiteDetails.findOne({},{siteAddress:1,siteCloseOn:1,siteEmail:1,siteFavIcon:1,siteLogo:1,siteName:1,siteMap:1,siteOpenHr:1,sitePhone:1,_id:0})
        
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
