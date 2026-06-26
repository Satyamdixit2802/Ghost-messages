"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import * as z from 'zod'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {useDebounceValue} from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/router'

const Page = () => {
  
   const router = useRouter()
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const debouncedValue = useDebounceValue(username,300 )  

  return (
    <div>
       <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
    </div>
  );
};

export default Page;
