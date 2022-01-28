<template>
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
// import { getJsonData } from '@/api'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      chartList: {},
      ROOT_PATH:
        'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'
    }
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    splitData(rawData) {
      const categoryData = []
      const values = []
      const volumes = []
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      }
    },
    getData() {
      this.$axios
        .get(this.ROOT_PATH + '/data/asset/data/stock-DJI.json')
        .then(res => {
          this.chartList = this.splitData(res.data)
          this.initChart()
        })
    },

    calculateMA(dayCount, data) {
      var result = []
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1]
        }
        result.push(+(sum / dayCount).toFixed(3))
      }
      return result
    },

    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption(
        {
          animation: false,
          legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30'],
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
            padding: 10,
            textStyle: {
              color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
              const obj = {
                top: 10
              }
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
              return obj
            }
            // extraCssText: 'width: 170px'
          },
          axisPointer: {
            link: [
              {
                xAxisIndex: 'all'
              }
            ],
            label: {
              backgroundColor: '#777'
            }
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: false
              },
              brush: {
                type: ['lineX', 'clear']
              }
            }
          },
          brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
              colorAlpha: 0.4
            }
          },
          visualMap: {
            show: true,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
              {
                value: 1,
                color: '#ec0000'
              },
              {
                value: -1,
                color: '#00da3c'
              }
            ]
          },
          grid: [
            {
              left: '10%',
              right: '8%',
              height: '50%',
              show: true,
              backgroundColor: '#15161b'
            },
            {
              left: '10%',
              right: '8%',
              top: '63%',
              height: '16%',
              show: true,
              backgroundColor: '#15161b'
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: this.chartList.categoryData,
              boundaryGap: false,
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#c2c4ce'
                }
              },
              splitLine: { show: false },
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                z: 100
              }
            },
            {
              type: 'category',
              gridIndex: 1,
              data: this.chartList.categoryData,
              boundaryGap: false,
              axisLine: { onZero: false },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
              min: 'dataMin',
              max: 'dataMax'
            }
          ],
          yAxis: [
            {
              scale: true,
              splitArea: {
                show: true
              },
              splitLine: {
                lineStyle: {
                  color: '#63656b'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#c2c4ce'
                }
              }
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 98,
              end: 100
            },
            {
              show: true,
              xAxisIndex: [0, 1],
              type: 'slider',
              top: '85%',
              start: 98,
              end: 100
            }
          ],
          series: [
            {
              name: 'Dow-Jones index',
              type: 'candlestick',
              data: this.chartList.values,
              itemStyle: {
                color: '#00da3c',
                color0: '#ec0000',
                borderColor: undefined,
                borderColor0: undefined
              },
              tooltip: {
                formatter: function (param) {
                  param = param[0]
                  return [
                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    'Open: ' + param.data[0] + '<br/>',
                    'Close: ' + param.data[1] + '<br/>',
                    'Lowest: ' + param.data[2] + '<br/>',
                    'Highest: ' + param.data[3] + '<br/>'
                  ].join('')
                }
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: this.calculateMA(5, this.chartList),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: this.calculateMA(10, this.chartList),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: this.calculateMA(20, this.chartList),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: this.calculateMA(30, this.chartList),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: this.chartList.volumes
            }
          ]
        },
        true
      )
      this.chart.dispatchAction({
        type: 'brush',
        areas: [
          {
            brushType: 'lineX',
            coordRange: ['2016-06-02', '2016-06-20'],
            xAxisIndex: 0
          }
        ]
      })
    }
  }
}
</script>
