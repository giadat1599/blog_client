'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { signUpFormSchema, SignUpFormValues } from '@/app/(auth)/_schemas/signup-form-schema'
import LoadingButton from '@/components/loading-button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useCurrentUser from '@/hooks/use-current-user'
import useSomethingWentWrongToast from '@/hooks/utils/use-st-went-wrong-toast'
import useUnloadWarning from '@/hooks/utils/use-unload-warning'
import { BAD_REQUEST, CONFLICT } from '@/lib/http-status'
import { requestVerificationCode, signUp } from '@/services/client/auth'

import VerificationCodeForm from './verification-code-form'

export default function SignUpForm() {
  const errorToast = useSomethingWentWrongToast()
  const { mutate } = useCurrentUser()
  const router = useRouter()
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

  const onRequestVerificationCode = async (email: string) => {
    try {
      await requestVerificationCode(email)
      setIsVerificationStep(true)
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === CONFLICT) {
          formMethods.setError('email', { message: 'Email already exists' })
        }
      } else {
        errorToast()
      }
    }
  }

  const onSignUp = async (values: SignUpFormValues) => {
    try {
      const user = await signUp(values)
      mutate(user)
      router.push('/')
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === BAD_REQUEST) {
          const responseErrorMsg = (await error.response.json()).error || ''
          if (responseErrorMsg === 'User already taken') {
            formMethods.setError('username', { message: 'Username already exists.' })
          }
          if (responseErrorMsg === 'Verification code incorrect or expired') {
            formMethods.setError('verificationCode', { message: 'Verification code incorrect or expired.' })
          }
        }
      } else {
        errorToast()
      }
    }
  }

  const onSubmit = async (values: SignUpFormValues) => {
    if (values.password !== values.confirmPassword) {
      formMethods.setError('confirmPassword', { message: 'Passwords do not match.' })
      return
    }
    if (!isVerificationStep) return await onRequestVerificationCode(values.email)

    if (!values.verificationCode) {
      formMethods.setError('verificationCode', { message: 'Verification code is required.' })
      return
    }

    await onSignUp(values)
  }

  useUnloadWarning(formMethods.formState.isDirty)

  return (
    <Form {...formMethods}>
      <form className='space-y-4 mt-5' onSubmit={formMethods.handleSubmit(onSubmit)}>
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
        {isVerificationStep && <VerificationCodeForm />}
        <LoadingButton className='w-full' size='lg' loading={formMethods.formState.isSubmitting}>
          {isVerificationStep ? 'Confirm' : 'Create account'}
        </LoadingButton>
      </form>
    </Form>
  )
}
