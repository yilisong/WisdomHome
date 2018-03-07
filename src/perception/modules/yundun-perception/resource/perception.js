import { perception } from './'

export default {
  //  风险排名,漏洞分布TOP10
  getScancount: () => perception.post('/tsgz_riskranking_scancount', {}),
  //获取域名漏洞统计列表
  getLoopholeList: parmas =>
    perception.post('/tsgz_scan_domain_loophole_list', {
      ...parmas
    }),
  //获取域名漏洞详情
  getLoopholeListDetails: parmas =>
    perception.post('/tsgz_domain_loophole_detail', {
      ...parmas
    }),
  //地域统计
  getChongQingChartsData: () => perception.post('/tsgz_region_count', {}),
  //获取任务功能统计总数列表
  getTaskTotalList: () => perception.post('/tsgz_task_total_list', {}),
  // 获取风险敏感词图表（top5)
  getSensitiveWordView: () =>
    perception.post('/tsgz_risk_sensitive_word_view', {}),
  //tsgz_task_monitor_number
  getMonitorNumber: () => perception.post('/tsgz_task_monitor_number', {}),
  // 风险网站等
  getFeatureCount: () => perception.post('/tsgz_task_feature_count', {}),
  //风险篡改 top10   tsgz_risk_tamper_top
  getTamperTop: () => perception.post('/tsgz_risk_tamper_top', {}),
  //tab 切换项 其他的数据tsgz_risk_logcontent_list
  getLogcontentList: parmas =>
    perception.post('/tsgz_risk_logcontent_list', {
      ...parmas
    }),
  //tab 切换项 其他的数据 详情 tsgz_risk_logcontent_detail
  getLogcontentListDetail: parmas =>
    perception.post('/tsgz_risk_logcontent_detail', {
      ...parmas
    }),
  //根据类型获取tab 列表页面 左侧banner   tsgz_risk_contentbytype
  getContentByType: parmas =>
    perception.post('/tsgz_risk_contentbytype', {
      ...parmas
    }),
  //tsgz_task_notice_log
  getNoticeLogStatus: () => perception.post('/tsgz_update_log_get', {}),
  //tsgz_task_notice_log
  getNoticeLog: parmas =>
    perception.post('/tsgz_task_notice_log', {
      ...parmas
    }),
  getTackInfo: parmas =>
    perception.get('/tsgz_task_get_info', {
      ...parmas
    })
}
