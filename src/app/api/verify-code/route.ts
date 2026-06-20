import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User.model'
import { success } from 'better-auth';




export async function POST(request: Request) {

    await dbConnect();
    try {
        const { username, code } = await request.json()
        const decodedUsername = decodeURI(username);
        const user = await UserModel.findOne({ username: decodedUsername })
          
        if(!user){
            return Response.json(
                {
                    success : false,
                    message : "user not found"
                },
                {
                    status : 500
                }
            )
        }
        const isCodeVerified = user.verifyCode === code ;
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeExpired && isCodeExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json(
            {
                success : true,
                message : "Account is verified successful"
            },
            {
                status: 200
            }
         )
        } else if (!isCodeExpired){
              return Response.json(
            {
                success : false,
                message : "Verification code has expired, please signup to get a new code"
            },
            {
                status: 400
            }
         )
        }else {
              return Response.json(
            {
                success : false,
                message : "Incorrect verification code"
            },
            {
                status: 400
            }
         )
        }
         

    } catch (error) {
        console.error("Error verifying user", error);
        return Response.json({
            success: false,
            message: "Error Verifying user"
        }, {
            status: 500
        })
    }
}