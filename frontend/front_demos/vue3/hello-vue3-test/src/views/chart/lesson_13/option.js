let option = {

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
            },
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
    "trigger": "axis",
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
      "showBackground": true,
      "backgroundStyle": {
        "color": "rgba(255, 255, 255, 0)",
        "shadowColor": "rgba(0, 0, 0, 0.5)",
        "shadowBlur": 0
      },
      "itemStyle": {
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted",
        "borderWidth": 0,
        "barBorderRadius": 0,
        "opacity": 1,
        "shadowBlur": 0,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "shadowColor": "rgba(0, 0, 0, 0.25)"
      },
      "barGap": "30%",
      "barMaxWidth": "100px",
      "stack": false
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
      "showBackground": true,
      "backgroundStyle": {
        "color": "rgba(255, 255, 255, 0)",
        "shadowColor": "rgba(0, 0, 0, 0.5)",
        "shadowBlur": 0
      },
      "itemStyle": {
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted",
        "borderWidth": 0,
        "barBorderRadius": 0,
        "opacity": 1,
        "shadowBlur": 0,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "shadowColor": "rgba(0, 0, 0, 0.25)"
      },
      "barGap": "30%",
      "barMaxWidth": "100px",
      "stack": false
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
      "showBackground": true,
      "backgroundStyle": {
        "color": "rgba(255, 255, 255, 0)",
        "shadowColor": "rgba(0, 0, 0, 0.5)",
        "shadowBlur": 0
      },
      "itemStyle": {
        "borderColor": " rgba(26, 26, 26, 0.08)",
        "borderType": "dotted",
        "borderWidth": 0,
        "barBorderRadius": 0,
        "opacity": 1,
        "shadowBlur": 0,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "shadowColor": "rgba(0, 0, 0, 0.25)"
      },
      "barGap": "30%",
      "barMaxWidth": "100px",
      "stack": false
    }
  ],
}

export default option