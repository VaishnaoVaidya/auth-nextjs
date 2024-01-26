import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        
        const user = await User.findOne({email})
        
        if(!user) {
            return NextResponse.json({message: "User Not Found"}, {status: 400})
        }

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({message: "Password recovery email sent Successfully", success: true})

        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }

}

