import { perception } from './'

export default {
  //  风险排名,漏洞分布TOP10
  getScancount: () => perception.post('/tsgz_riskranking_scancount', {}),
}
