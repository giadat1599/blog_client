'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { signUpFormSchema, SignUpFormValues } from '@/app/(auth)/_schemas/signup-form-schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useUnloadWarning from '@/hooks/utils/use-unload-warning'

import VerificationCodeForm from './verification-code-form'

export default function SignUpForm() {
  const [isVerificationStep, setIsVerificationStep] = useState(false)
  const formMethods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      verificationCode: ''
    }
  })

  const onSubmit = (values: SignUpFormValues) => {
    if (values.password !== values.confirmPassword) {
      formMethods.setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    if (!isVerificationStep) {
      setIsVerificationStep(true)
      return
    }

    if (!values.verificationCode) {
      formMethods.setError('verificationCode', { message: 'Verification code is required' })
      return
    }

    // TODO: send request
    console.log(values)
  }

  useUnloadWarning(formMethods.formState.isDirty)

  return (
    <Form {...formMethods}>
      <form className='space-y-4 mt-5' onSubmit={formMethods.handleSubmit(onSubmit)}>
        {!isVerificationStep && (
          <>
            <FormField
              control={formMethods.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription hidden>Enter your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' />
                  </FormControl>
                  <FormDescription hidden>Enter your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormDescription hidden>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormDescription hidden>Confirm your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {isVerificationStep && <VerificationCodeForm />}
        <Button className='w-full' size='lg'>
          {isVerificationStep ? 'Confirm' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
