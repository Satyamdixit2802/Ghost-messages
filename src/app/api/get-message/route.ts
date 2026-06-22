import {getServerSession} from 'next-auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User.model'
import {authOptions} from '../auth/[...nextauth]/options'
import {User} from 'next-auth'
import mongoose from 'mongoose';
import { use } from 'react';
import { success } from 'better-auth';


export async function GET(request : Request){
    await dbConnect();
    const session =  await getServerSession(authOptions);
    const user =  session?.user;

    if(!session || !session.user){
        return Response.json(
            {
                success : false ,
                message : "NOt Authenticated"
            },
            {
                status : 401
            }
        )
    }
    const userId =  new mongoose.Types.ObjectId(user?._id)

    try {
        const user = await UserModel.aggregate([
            {
                $match : {id: userId}
            },
            {$unwind : '$messages'},
            {$sort : {'messages.createdAt':-1}},
            {$group : {_id : '$_id',messages : {$push : '$messages'}}}
        ])
        if(!user || user.length === 0){
            return Response.json({
                success : false,
                message : 'User not found'
            },{
                status : 401
            })
        }
        return Response.json({
            success : true ,
            message : user[0].messages
        }, {
            status : 200
        })

    } catch (error) {
        console.error('An unexpected error',error)
        return Response.json({
            success : false
        },{
            status : 500
        })
    }
}
