
import StoreIncharge from "@/models/storeIncharge/StoreIncharge";
import StoreLocator from "@/models/storeLocator/StoreLocator";
import Store from "@/models/stores/Store";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
const url = require('url');
export async function GET(request, response) {
    try {
        const url = new URL(request.url)
        const userId = url.searchParams.get("userId")
        await connectToDb();
        const store_incharge = await StoreIncharge.find({ inchargeEmail: userId }, { storeId: 1 })
       
        if (store_incharge) {
            const results = await Promise.all(store_incharge.map(async (val) => {
                const data=await Store.findOne({_id:val?.storeId})
                if (!data) return null
                const city=await StoreLocator.findOne({_id:data?.parentId})
               
                if (!val) return null
                const {_id,storeAddress,storePhone,storeMap}=data
                const {storeCity}=city
                return {_id,storeAddress,storePhone,storeMap,storeCity}
            }));
            const nonNullResults = results.filter(result => result !== null);
            return NextResponse.json({
                data: nonNullResults,
            }, { status: 200 })
        }
        return NextResponse.json({
            data: [],
        }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error in getting StoreIncharge Details" + e
        }, { status: 500 })
    }
}
