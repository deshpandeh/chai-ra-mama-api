
import connectToDb from "@/utils/connectToDb";
import Store from "@/models/stores/Store";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await Store.find({updateStatus:{$nin:["linked","unlinked"]}})
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
