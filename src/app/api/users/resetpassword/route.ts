import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody  = await request.json();
    const {newPassword, token} = reqBody
    console.log(reqBody);

    const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: {$gt: Date.now()}
    })
    console.log(user);

    if(!user) {
        return NextResponse.json({ error: "User not found" , status: 404})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    console.log(newPassword);
    

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    // user.save();
    const updatePassword = await user.save();
    console.log(updatePassword);
    

    return NextResponse.json({message : "Password reset successfully"}, {status : 200})

  } catch (error: any) {
    console.log(error.message)

    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
