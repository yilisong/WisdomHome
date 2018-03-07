let proxyTable

switch (process.env.API_ENV) {
  case 'pre':
    proxyTable = new Map([
      ['/api', 'http://homev5.pre.nodevops.cn'],
      ['/game_api', 'http://feature-1249.game_security_home.test.nodevops.cn'],
      ['/cloud_api', 'http://cloud.yundun.com'],
      ['/perception_api', 'http://tsgz_home.yundun.com']
    ])
    break
  case 'release':
    proxyTable = new Map([
      ['/api', 'http://homev5.yundun.com'],
      ['/game_api', 'http://feature-1249.game_security_home.test.nodevops.cn'],
      ['/cloud_api', 'http://cloud.yundun.com'],
      ['/perception_api', 'http://tsgz_home.yundun.com']
    ])
    break
  default:
    proxyTable = new Map([
      ['/api', 'http://homev5.test.nodevops.cn'],
      ['/game_api', 'http://feature-1249.game_security_home.test.nodevops.cn'],
      ['/cloud_api', 'http://k7ecs.test.nodevops.cn'],
      ['/perception_api', 'http://tsgzhome.test.nodevops.cn'],
      ['/normal_api', 'http://v4.yundun.com']
    ])
    break
}

module.exports = proxyTable
