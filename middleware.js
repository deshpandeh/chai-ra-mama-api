import { NextResponse } from "next/server";
export async function middleware(req, res) {
  try {
    const apiReq =  String([...req.headers])
    if(apiReq.includes("localhost:3000") || apiReq.includes("localhost:3000")){
      return NextResponse.next();
    }
    else{
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  catch (e) { 

  }
}

export const config = {
  matcher: ['/abcapi/:path*']
}
