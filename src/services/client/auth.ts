import { LoginFormValues } from '@/app/(auth)/_schemas/login-form-schema'
import { SignUpFormValues } from '@/app/(auth)/_schemas/signup-form-schema'
import kyInstance from '@/lib/ky'
import { User } from '@/types/user'

export const login = async (data: LoginFormValues): Promise<User> => {
  const user: User = await kyInstance
    .post('users/login', {
      json: data
    })
    .json()
  return user
}

export const logout = async () => {
  await kyInstance.post('users/logout')
}

export const signUp = async (data: SignUpFormValues): Promise<User> => {
  const user: User = await kyInstance.post('users/signup', { json: data }).json()
  return user
}
export const requestVerificationCode = async (email: string): Promise<void> => {
  await kyInstance.post('users/request-verification-code', {
    json: { email }
  })
}

export const getCurrentUser = async (): Promise<User> => {
  const user: User = await kyInstance.get('users/me').json()
  return user
}
