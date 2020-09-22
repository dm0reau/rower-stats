import axios, { AxiosError } from 'axios'

const baseURL = process.env.REACT_APP_API_URL
if (!baseURL) {
  throw new Error('You must set REACT_APP_API_URL env variable')
}

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
})
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export function apiFetcher(uri: string): Promise<any> {
  return apiClient.get(uri, { withCredentials: true }).then((res) => res.data)
}

export default apiClient
