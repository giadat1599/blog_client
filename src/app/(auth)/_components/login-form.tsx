'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { loginFormSchema, LoginFormValues } from '@/app/(auth)/_schemas/login-form-schema'
import LoadingButton from '@/components/loading-button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useCurrentUser from '@/hooks/use-current-user'
import { useToast } from '@/hooks/use-toast'
import { UNAUTHORIZED } from '@/lib/http-status'
import { login } from '@/services/client/auth'

export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { mutate: mutateUser } = useCurrentUser()
  const [error, setError] = useState<string | null>(null)
  const formMethods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setError(null)
      const user = await login(values)
      mutateUser(user)
      router.push('/')
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === UNAUTHORIZED) {
          setError('Username or password is incorrect.')
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request. Please try again'
        })
      }
    }
  }

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
        {error && <p className='text-[0.8rem] font-medium text-destructive'>{error}</p>}
        <LoadingButton className='w-full' size='lg' loading={formMethods.formState.isSubmitting}>
          Log in
        </LoadingButton>
      </form>
    </Form>
  )
}
