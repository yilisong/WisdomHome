import axios from 'axios'
import Interceptor, { PRECEPTION_URL } from 'common/config/interceptor'

axios.defaults.timeout = 180000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const resources = {
  SourceWebResource: axios.create({
    baseURL: PRECEPTION_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

const InterceptorRegular = new Interceptor()

resources.SourceWebResource.interceptors.request.use(
  ...InterceptorRegular.beforeRequest
)

export const { SourceWebResource } = resources
