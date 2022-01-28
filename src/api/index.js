import request from '@/utils/request'

export function getJsonData() {
  return request({
    url: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/stock-DJI.json',
    method: 'get'
  })
}
