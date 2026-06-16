import dbconnect from '@/lib/dbConnect'
import UserModel from '@/models/User.model'
import {success, z} from "zod"

import {usernameValidation} from '@/Schemas/signUpSchema'
import { log } from 'next/dist/server/typescript/utils';


const usernameQuerySchema = z.object({
    username : usernameValidation

})

export async function GET (request: Request){
    await dbconnect()
    try {
        const {searchParams} =  new URL(request.url)
        const queryParam = {
            username : searchParams.get('username')
        }
    } catch (error) {
        console.error("Error checking username",error);
        return Response.json({
            success : false,
            message : "Error checking Username"
        },
    { status : 500})
        
    }
}