import apiClient from './client'

const logoutEndpoint = 'auth/logout'

export default async function apiLogout(): Promise<'ok' | null> {
  try {
    await apiClient.get(logoutEndpoint)
    return 'ok'
  } catch {
    return null
  }
}
