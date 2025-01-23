'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginFormSchema, LoginFormValues } from '@/app/(auth)/_schemas/login-form-schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  const formMethods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = (values: LoginFormValues) => {
    console.log(values)
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
        <Button className='w-full' size='lg'>
          Log in
        </Button>
      </form>
    </Form>
  )
}
