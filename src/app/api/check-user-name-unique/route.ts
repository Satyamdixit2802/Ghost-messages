import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from 'zod'


import { usernameValidation } from "@/Schemas/signUpSchema";



const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {

    if(request.method !=='GET'){
        return Response.json(
            {
                success : false,
                message : 'Method not allowed'
            },
            {
                status : 405
            }
        )
    }

  await dbconnect();

  try {
    const {searchParams} = new URL(request.url);
    const queryParam = {
        username : searchParams.get('username')
    
    }
    //validate with zod

   const result =  UsernameQuerySchema.safeParse(queryParam);
   if(!result.success){
    const usernameError = result.error.format();
    usernameError?._errors  || [];
    return Response.json(
        {
            success : false,
            message : "Invalid request"
        },
        {status : 400}
    )
   }
   

   const {username} = result.data;
   const existingUser = await UserModel.findOne({username , isVerified : true})
   if(existingUser){
    return Response.json(
        {
            success : false,
            message : "Username is already taken"
        },
        {status : 400}
    )

   }
   return Response.json({
    success : true ,
    message : "username is unique"
   },
     {
        status : 200
     })
    
} catch (error) {
    console.error("Error checking username", error);
    return Response.json({
        success : false,

    })
}
}
