import { AxiosResponse } from 'axios'
import apiClient from './client'
import { User } from './interfaces/user'

const loginEndpoint = '/auth/login'

export default async function apiLogin(
  username: string,
  password: string,
): Promise<User | null> {
  try {
    const response: AxiosResponse<User> = await apiClient.post(loginEndpoint, {
      username,
      password,
    })
    return { username: response.data.username }
  } catch {
    return null
  }
}
