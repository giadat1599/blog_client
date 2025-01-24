import { LoginFormValues } from '@/app/(auth)/_schemas/login-form-schema'
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

export const getCurrentUser = async (): Promise<User> => {
  const user: User = await kyInstance.get('users/me').json()
  return user
}
