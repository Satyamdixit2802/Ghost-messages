import dbConnect from '@/lib/dbConnect'
import UserMode from '@/models/User.model'
import bcrypt from 'bcryptjs'

import {sendEmailVerification} from '@/helper/sendEmailVerification'
import { success } from 'zod';

export async function POST (req: Request){
    await dbConnect()

    try {
        const {username, email, password} =   await req.json()
    } catch (error) {
        console.error('Error registering user',error)
        return  Response.json({
            success: false,
            message: 'Error registering user'
        },
    {
        status : 500
    })
    }
}