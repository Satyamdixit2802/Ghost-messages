import {NextAuthOptions} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User.model'


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username : {label : "username", type :"text"},
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any | null> {
        await dbConnect()

        try {
            if(!credentials?.email || !credentials?.password){
                throw new Error("Email and password are required")
            }
            const user = await UserModel.findOne({
                $or : [ {email : credentials.email}, {username : credentials.username}]
            })

            if(!user){
                throw new Error("NO  user found with this email")

            }
            if(!user.isVerified){
                throw new Error("Please verify your account before login ")
            }
            const isPasswordVerified = await bcrypt.compare(credentials.password, user.password)
            if(isPasswordVerified){
                return user
            }else {
                throw new Error('Incorrect password')
            }
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
      }
    })
  ],
  callbacks: {
   
  
    async jwt({ token, user, }) {
      if(user){
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username
      }
      return token
    },
      async session({ session,  token }) {
      if(token){
        session.user._id = token._id;
        session.user.isVerified = token.isVerified
        session.user.isAcceptingMessages = token.isAcceptingMessages
        session.user.username = token.username 
        }
      return session
    }
  }
,



  pages : {
    signIn : '/sign-in'
  },
  session : {
    strategy : 'jwt'
  },
  secret : process.env.NEXT_AUTH_SECRET
}