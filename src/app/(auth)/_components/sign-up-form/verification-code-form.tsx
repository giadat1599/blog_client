import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { SignUpFormValues } from '@/app/(auth)/_schemas/signup-form-schema'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import useCountDown from '@/hooks/utils/use-countdown'
import { requestVerificationCode } from '@/services/client/auth'

export default function VerificationCodeForm() {
  const { toast } = useToast()
  const { start, secondsLeft, formatToMinutes } = useCountDown()
  const formMethods = useFormContext<SignUpFormValues>()

  const onResendCode = async () => {
    await requestVerificationCode(formMethods.getValues('email'))
    toast({
      title: 'Verification code has been sent.',
      description: 'Please check your email.'
    })
    start(5 * 60)
  }

  useEffect(() => {
    start(5 * 60)
  }, [start])

  return (
    <div className='space-y-3'>
      <Alert className='border-primary bg-primary/10'>
        <AlertDescription className='text-center'>
          Your verification code has been sent to {formMethods.getValues('email')}
        </AlertDescription>
      </Alert>
      <FormField
        control={formMethods.control}
        name='verificationCode'
        render={({ field }) => (
          <FormItem>
            <FormLabel hidden>Verification code</FormLabel>
            <FormControl>
              <Input placeholder='Enter your verification code' {...field} />
            </FormControl>
            <FormDescription hidden>Enter your verification code</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='flex md:flex-row flex-col items-center justify-between'>
        <p className='text-sm text-primary text-center'>{formatToMinutes(secondsLeft)}</p>
        <p className='text-sm text-center'>
          Didn&apos;t receive a code?{' '}
          <span className='text-primary hover:underline cursor-pointer' onClick={onResendCode}>
            Resend
          </span>
        </p>
      </div>
    </div>
  )
}
