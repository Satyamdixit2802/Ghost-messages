import Usermodel from '@/models/User.model'
import dbConnect from '@/lib/dbConnect'

import {Message} from '@/models/User.model'



export async function POST (request : Request){
    
    await dbConnect()
    const {username, content} = await request.json();

    const user = await Usermodel.findOne({username})
   
    try {
         if(!user){
        return Response.json({
            success : true,
            message : "User not found"
        },
     {
        status : 404
     })
    }

    if(!user.isAcceptingMessage){
               return Response.json({
                success : false ,
                message : "User is not accepting the messages"
               },
            {
                status : 403
            })
    }
    const newMessage = {content ,createdAt: new Date()}
         user.messages.push(newMessage as Message)
         await user.save()

         return Response.json(
            {
                success : true,
                message : "message sent successful"
            },{
                status : 201
            }
         )
    } catch (error) {
         console.error('Error adding messages',error)
        return Response.json({
            success : false,
            message : "Internal server error"
        },{
            status : 500
        })
        
    }
}