import axios from 'axios'
import Interceptor, { PRECEPTION_URL } from 'common/config/interceptor'

axios.defaults.timeout = 180000

const resources = {
  perception: axios.create({
    baseURL: PRECEPTION_URL
  })
}

const InterceptorWithProgress = new Interceptor({ progress: true })

for (const key of Object.keys(resources)) {
  resources[key].interceptors.request.use(
    ...InterceptorWithProgress.beforeRequest
  )
  resources[key].interceptors.response.use(
    ...InterceptorWithProgress.afterResponse
  )
}

export const { perception } = resources
