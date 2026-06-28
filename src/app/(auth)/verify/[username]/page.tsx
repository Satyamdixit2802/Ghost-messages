'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import {toast} from 'sonner'
import { Controller, useForm } from 'react-hook-form';

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from '@/Schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponses';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username:string}>()

    const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>)=> {

    try {
        const response = await axios.post(`/api/verify-code`, {
            username : params.username ,
            email : data.code
        })
        toast("success",{
            description : response.data.message
        })
        router.replace('sign-in')
    } catch (error) {
        console.error("Error in  verifying  user", error);
      const axiosError = error as AxiosError<ApiResponse>;
    
      toast.error("Verification  failed", {
        description:  axiosError.response?.data.message,
      });
      
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Verify your account
                </h1>
                <p className='mb-4'>Enter the verification code sent to your email</p>
            </div>
             <Card>
          <CardContent>
            <form id="form-rh" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <Controller
                  name="code"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rh-code"
                        className="font-bold text-xl"
                      >
                        Verification code
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rh-username"
                        className="p-3"
                        aria-invalid={fieldState.invalid}
                        placeholder="verification code"
                        autoComplete="off"
                       
                      />
                     
                      
                      
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                 </FieldGroup>
            </form>
          </CardContent>
             
          <CardFooter>
            <Field
              orientation="horizontal"
              className="text-center flex justify-center "
            >
              <Button
                type="submit"
                form="form-rh"
               
                size="lg"
              >
                Verify
              </Button>
            </Field>
          </CardFooter>
        </Card>
            </div> 
      
    </div>
  )
}

export default VerifyAccount
