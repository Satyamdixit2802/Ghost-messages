import {NextAuthOptions} from "next-auth"

import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User.model'
import GoogleProvider from 'next-auth/providers/google'
import { email } from "better-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect()

        try {
            const user  = await UserModel.findOne({
                $or : [ {email : credentials.identifier}, {username : credentials.identifier}]
            })

            if(!user){
                throw new Error("NO  user found with this email")

            }
            if(!user.isVerified){
                throw new Error("Please verify your account before login ")
            }
            const isPasswordVerified = await bcrypt.compare(credentials.password,user.password)
            if(isPasswordVerified){
                return user
            }else {
                throw new Error('Incorrect password')
            }
            
        } catch (error : any) {
            throw new Error(error)
        }
      }
    })
  ],
  pages : {
    signIn : '/sign-in'
  },
  session : {
    strategy : 'jwt'
  },
  secret : process.env.NEXTAUTH_URL
}