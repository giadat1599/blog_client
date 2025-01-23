import { z } from 'zod'

export const signUpFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(20)
    .regex(/^[a-zA-Z0-9_]*$/),
  email: z.string().email('Email is invalid'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/^(?!.* )/),
  verificationCode: z.string().optional(),
  confirmPassword: z.string().min(1, { message: 'You must confirm your password' })
})

export type SignUpFormValues = z.infer<typeof signUpFormSchema>
