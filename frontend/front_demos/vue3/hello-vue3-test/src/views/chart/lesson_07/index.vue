<template>
  <div class="outer">
    <h2>父组件</h2>


    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeOpTitle"> changeOpTitle </button>&nbsp;&nbsp;
      </dd>
    </dl>

    <Child :chartConfig="chartConfig" />
  </div>
</template>  

<script lang="ts" setup>
import { stubTrue } from 'lodash';
import { reactive } from 'vue';
import Child from './child/child.vue'

let option2 = {
  "title": {
    "show": "true",
    "text": "这是折线图"
  },
  "color": [
    "#3B82F6",
    "#3EB349",
    "#FF9214",
    "#FB4932",
    "#6366F1",
    "#F43F5E",
    "#0EA5E9",
    "#D946EF",
    "#14B8A6",
    "#A855F7"
  ],
  "grid": {
    "top": "14%",
    "right": "14%",
    "bottom": "16%",
    "left": "12%"
  },
  "xAxis": {
    "boundaryGap": true,
    "type": "category",
    "alignTicks": true,
    "show": true,
    "nameLocation": "end",
    "splitLine": {
      "show": false,
      "lineStyle": {
        "width": 1,
        "type": "solid",
        "color": " rgba(26, 26, 26, 0.08)"
      }
    },
    "axisLine": {
      "lineStyle": {
        "color": " rgba(26, 26, 26, 0.08)",
        "width": 1
      }
    },
    "name": "x1",
    "nameGap": 20,
    "nameTextStyle": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 14,
      "fontWeight": "400",
      "textAlign": "left",
      "lineHeight": 1,
      "color": " #1A1A1A"
    },
    "axisLabel": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 12,
      "fontWeight": "400",
      "textAlign": "center",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.6)",
      "margin": 20,
      "rotate": 0
    },
    "axisPointer": {
      "type": "line"
    }
  },
  "yAxis": [
    {
      "type": "value",
      "alignTicks": true,
      "show": true,
      "nameLocation": "end",
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": " rgba(26, 26, 26, 0.08)"
        }
      },
      "axisTick": {
        "show": true
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "width": 1,
          "type": "solid",
          "color": " rgba(26, 26, 26, 0.08)"
        }
      },
      "splitArea": {
        "show": true,
        "areaStyle": {
          "color": [
            "var(--backgroundStyle-middle)",
            {
              "colorStops": [],
              "x": {
                "type": "linear",
                "x": 1,
                "y": 1,
                "x2": 1,
                "y2": 0,
                "colorStops": [
                  {
                    "offset": 0,
                    "color": "#FFFFFF"
                  },
                  {
                    "offset": 1,
                    "color": "#FFFFFF"
                  }
                ]
              },
              "y": 0,
              "x2": 1,
              "y2": 0,
              "type": "linear",
              "global": false
            }
          ]
        }
      },
      "name": "y1",
      "nameGap": 30,
      "nameTextStyle": {
        "fontFamily": "Noto Sans CJK",
        "fontSize": 14,
        "fontWeight": "400",
        "textAlign": "right",
        "lineHeight": 1,
        "color": " #1A1A1A"
      },
      "axisLabel": {
        "fontFamily": "Noto Sans CJK",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "right",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)",
        "margin": 20,
        "rotate": 0
      },
      "axisPointer": {
        "show": false,
        "type": "line"
      }
    }
  ],
  "axisPointer": {
    "show": true,
    "label": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 12,
      "fontWeight": "400",
      "textAlign": "left",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.6)",
      "show": true,
      "padding": [
        10,
        8
      ],
      "margin": 10,
      "backgroundColor": "#767676"
    },
    "lineStyle": {
      "color": " rgba(26, 26, 26, 0.08)",
      "width": 1,
      "type": "solid"
    },
    "shadowStyle": {
      "color": " linear-gradient(0deg, rgba(41, 41, 41, 0.09) 0%, rgba(41, 41, 41, 0.09) 100%)"
    }
  },
  "legend": {
    "show": true,
    "orient": "horizontal",
    "type": "plain",
    "itemGap": 10,
    "top": "bottom",
    "left": "center",
    "textStyle": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 14,
      "fontWeight": "400",
      "textAlign": "right",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.8)"
    }
  },
  "tooltip": {
    "show": true,
    "extraCssText": "\n        background:  linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%);\n        border-radius: 6px;\n        border: 1px solid  rgba(26, 26, 26, 0.08);\n        backdrop-filter: blur(0px);\n        opacity: 1.00;\n      "
  },
  "dataset": {
    "source": [
      [
        "趋势",
        "数据一",
        "数据二",
        "数据三"
      ],
      [
        "2014",
        38,
        14,
        60
      ],
      [
        "2015",
        39,
        22,
        55
      ],
      [
        "2016",
        33,
        17,
        56
      ],
      [
        "2017",
        36,
        18,
        49
      ],
      [
        "2018",
        39,
        25,
        53
      ],
      [
        "2019",
        37,
        23,
        53
      ],
      [
        "2020",
        42,
        22,
        57
      ],
      [
        "2021",
        44,
        21,
        61
      ],
      [
        "2022",
        38,
        29,
        59
      ]
    ]
  },
  "series": [
    {
      "type": "bar",
      "yAxisIndex": 0,
      "label": {
        "show": true,
        "distance": 10,
        "position": "top",
        "fontStyle": "italic",
        "fontFamily": "PingFang SC",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "center",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)"
      },
      "barMaxWidth": 100,
      "itemStyle": {
        "borderRadius": 0,
        "borderWidth": 0,
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted"
      }
    },
    {
      "type": "bar",
      "yAxisIndex": 0,
      "label": {
        "show": true,
        "distance": 10,
        "position": "top",
        "fontStyle": "italic",
        "fontFamily": "PingFang SC",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "center",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)"
      },
      "barMaxWidth": 100,
      "itemStyle": {
        "borderRadius": 0,
        "borderWidth": 0,
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted"
      }
    },
    {
      "type": "bar",
      "yAxisIndex": 0,
      "label": {
        "show": true,
        "distance": 10,
        "position": "top",
        "fontStyle": "italic",
        "fontFamily": "PingFang SC",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "center",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)"
      },
      "barMaxWidth": 100,
      "itemStyle": {
        "borderRadius": 0,
        "borderWidth": 0,
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted"
      }
    }
  ]
}

let option = {
  "legend": {
    "show": true,
    "orient": "horizontal",
    "type": "plain",
    "itemGap": 10,
    "top": "bottom",
    "left": "center",
    "textStyle": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 14,
      "fontWeight": "400",
      "textAlign": "right",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.8)"
    }
  },
  "dataset": {
    "source": [
      [
        "趋势",
        "数据一",
        "数据二",
        "数据三"
      ],
      [
        "2014",
        38,
        14,
        60
      ],
      [
        "2015",
        39,
        22,
        55
      ],
      [
        "2016",
        33,
        17,
        56
      ],
      [
        "2017",
        36,
        18,
        49
      ],
      [
        "2018",
        39,
        25,
        53
      ],
      [
        "2019",
        37,
        23,
        53
      ],
      [
        "2020",
        42,
        22,
        57
      ],
      [
        "2021",
        44,
        21,
        61
      ],
      [
        "2022",
        38,
        29,
        59
      ]
    ]
  },
  "series": [
    {
      "type": "bar",
      "yAxisIndex": 0,
      "label": {
        "show": true,
        "distance": 10,
        "position": "top",
        "fontStyle": "italic",
        "fontFamily": "PingFang SC",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "center",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)"
      },
      "barMaxWidth": 100,
      "itemStyle": {
        "borderRadius": 0,
        "borderWidth": 0,
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted"
      }
    },
    {
      "type": "bar",
      "yAxisIndex": 0,
      "label": {
        "show": true,
        "distance": 10,
        "position": "top",
        "fontStyle": "italic",
        "fontFamily": "PingFang SC",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "center",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)"
      },
      "barMaxWidth": 100,
      "itemStyle": {
        "borderRadius": 0,
        "borderWidth": 0,
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted"
      }
    },
    {
      "type": "bar",
      "yAxisIndex": 0,
      "label": {
        "show": true,
        "distance": 10,
        "position": "top",
        "fontStyle": "italic",
        "fontFamily": "PingFang SC",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "center",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)"
      },
      "barMaxWidth": 100,
      "itemStyle": {
        "borderRadius": 0,
        "borderWidth": 0,
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted"
      }
    }
  ],
  "tooltip": {
    "show": true,
    "extraCssText": "\n        background:  linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%);\n        border-radius: 6px;\n        border: 1px solid  rgba(26, 26, 26, 0.08);\n        backdrop-filter: blur(0px);\n        opacity: 1.00;\n      "
  },
  "axisPointer": {
    "show": true,
    "label": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 12,
      "fontWeight": "400",
      "textAlign": "left",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.6)",
      "show": true,
      "padding": [
        10,
        8
      ],
      "margin": 10,
      "backgroundColor": "#767676"
    },
    "lineStyle": {
      "color": " rgba(26, 26, 26, 0.08)",
      "width": 1,
      "type": "solid"
    },
    "shadowStyle": {
      "color": " linear-gradient(0deg, rgba(41, 41, 41, 0.09) 0%, rgba(41, 41, 41, 0.09) 100%)"
    }
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  "xAxis": {
    "boundaryGap": true,
    "type": "category",
    "alignTicks": true,
    "show": true,
    "nameLocation": "end",
    "splitLine": {
      "show": false,
      "lineStyle": {
        "width": 1,
        "type": "solid",
        "color": " rgba(26, 26, 26, 0.08)"
      }
    },
    "axisLine": {
      "lineStyle": {
        "color": " rgba(26, 26, 26, 0.08)",
        "width": 1
      }
    },
    "name": "x1",
    "nameGap": 20,
    "nameTextStyle": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 14,
      "fontWeight": "400",
      "textAlign": "left",
      "lineHeight": 1,
      "color": " #1A1A1A"
    },
    "axisLabel": {
      "fontFamily": "Noto Sans CJK",
      "fontSize": 12,
      "fontWeight": "400",
      "textAlign": "center",
      "lineHeight": 1,
      "color": " rgba(26, 26, 26, 0.6)",
      "margin": 20,
      "rotate": 0
    },
    "axisPointer": {
      "type": "line"
    }
  },
  // 声明一个 Y 轴，数值轴。
  yAxis: [
    {
      "type": "value",
      "alignTicks": true,
      "show": true,
      "nameLocation": "end",
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": " rgba(26, 26, 26, 0.08)"
        }
      },
      "axisTick": {
        "show": true
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "width": 1,
          "type": "solid",
          "color": " rgba(26, 26, 26, 0.08)"
        }
      },


      // "splitArea": {
      //   "show": true,
      //   "areaStyle": {
      //     "color": [
      //       "var(--backgroundStyle-middle)",
      //       {
      //         "colorStops": [],
      //         "x": {
      //           "type": "linear",
      //           "x": 1,
      //           "y": 1,
      //           "x2": 1,
      //           "y2": 0,
      //           "colorStops": [
      //             {
      //               "offset": 0,
      //               "color": "#FFFFFF"
      //             },
      //             {
      //               "offset": 1,
      //               "color": "#FFFFFF"
      //             }
      //           ]
      //         },
      //         "y": 0,
      //         "x2": 1,
      //         "y2": 0,
      //         "type": "linear",
      //         "global": false
      //       }
      //     ]
      //   }
      // },



      "name": "y1",
      "nameGap": 30,

      
      "nameTextStyle": {
        "fontFamily": "Noto Sans CJK",
        "fontSize": 14,
        "fontWeight": "400",
        "textAlign": "right",
        "lineHeight": 1,
        "color": " #1A1A1A"
      },
      "axisLabel": {
        "fontFamily": "Noto Sans CJK",
        "fontSize": 12,
        "fontWeight": "400",
        "textAlign": "right",
        "lineHeight": 1,
        "color": " rgba(26, 26, 26, 0.6)",
        "margin": 20,
        "rotate": 0
      },
      "axisPointer": {
        "show": false,
        "type": "line"
      }
    }
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
};

let chartConfig = reactive(option)

const changeOpTitle = () => {
  // 都可以监听到
  // chartConfig.aName = '张三'
  // chartConfig.info = {
  //   age: 18
  // }
  chartConfig.title = {
    text: 'ECharts 标题__' + Math.floor(Math.random() * 1000)
  }
}

</script>

<style scoped>
.outer {
  background-color: #fff;
  border: 1px solid royalblue;
  border-radius: 4px;
  padding: 20px;
}
</style>