import PageWiseTags from "@/models/pageWiseTags/PageWiseTags";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        const url = new URL(request.url)
        const pageId = url.searchParams.get("pageId")
        await connectToDb();
        const data = await PageWiseTags.findOne({pageId:pageId})
        
        return NextResponse.json({
            data: data,
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting PageWiseTags Details" + e
        }, { status: 500 })
    }
}
