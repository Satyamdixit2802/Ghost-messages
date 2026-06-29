"use client";


import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
 
  CardFooter,
 

} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Field,

  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schemas/signUpSchema";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponses";

import { Loader2 } from "lucide-react";
import { signInSchema } from "@/Schemas/signInSchema";
import { signIn } from "next-auth/react";
const Signin = () => {

    const router = useRouter();
 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
     
      identifier: "",
      password: "",
    },
  });

  

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
   const result =  await signIn('credentials',{
      redirect :false,
      identifier : data.identifier,
      password : data.password
    })
    if(result?.error){
      if(result.error == 'CredentialSignin') {
        toast.error("Login Failde",{
        description : "Incorrect username or password"
      })
      } else {
        toast.error("Error",{
        description : result.error
      })
      }
    }
    if(result?.url) {
      router.replace('/dashboard')
    }
  };
  
  return (
    
       <div className="flex justify-center items min-h-screen bg-gray-300  text-black py-10">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4"> Signin to start your anonymous adventure</p>
        </div>
        <Card>
          <CardContent>
            <form id="form-rh" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rh-username"
                        className="font-bold text-xl"
                      >
                        Username
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rh-username"
                        className="p-3"
                        aria-invalid={fieldState.invalid}
                        placeholder="Username"
                        autoComplete="off"
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                      {isCheckingUsername && (
                        <Loader2 className="animate-spin" />
                      )}
                      <p
                        className={`text-sm ${
                          usernameMessage === "username is unique"
                            ? "text-green-500"
                            : "text-red-600"
                        }`}
                      >
                        test {usernameMessage}
                      </p>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rh-email"
                        className="font-bold text-xl"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rh-email"
                        className="p-3"
                        aria-invalid={fieldState.invalid}
                        placeholder="email"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rh-password"
                        className="font-bold text-xl"
                      >
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rh-password"
                        type="password"
                        className="p-3"
                        aria-invalid={fieldState.invalid}
                        placeholder="password"
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
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </Field>
          </CardFooter>
        </Card>
        <div className="text-center mt-4 text-xl">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
    
  )
}

export default Signin
