import PageWiseTags from "@/models/pageWiseTags/PageWiseTags";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    try {
        await connectToDb();
        const data = await PageWiseTags.find()
        
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
export async function POST(request, response) {
    try {
        const body = await request.json();
        const {pageId,metaTitle,metaKeyword,metaDesc}= body
        await connectToDb();
        const isPageExist=await PageWiseTags.find({pageId})
        if(isPageExist){
            return NextResponse.json({
                message: "PageWiseTags Details already Exist",
            }, { status: 400 })
        }
        await PageWiseTags.create({pageId,metaTitle,metaKeyword,metaDesc})
        return NextResponse.json({
            message: "PageWiseTags Details added successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "error in adding PageWiseTags Details" + e
        }, { status: 500 })
    }
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const {_id,metaTitle,metaKeyword,metaDesc}= body
        await connectToDb();
        await PageWiseTags.findByIdAndUpdate(_id,{metaTitle,metaKeyword,metaDesc})
        return NextResponse.json({
            message:    "PageWiseTags Details updated successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Error in updating PageWiseTags Details` + e
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    try {
        const body = await request.json();
        const {_id}= body
        await connectToDb();
        await PageWiseTags.findByIdAndDelete(_id)
        return NextResponse.json({
            message: " PageWiseTags Details deleted successfully",
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: `Error in deleting PageWiseTags Details` + e
        }, { status: 500 })
    }
}

