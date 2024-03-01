import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("localUserToken", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        return response;

    }
    catch (e) {
        return NextResponse.json({
            message: "Error in deleting token" + e
        }, { status: 500 })
    }
}
