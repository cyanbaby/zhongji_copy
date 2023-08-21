export const crudOptions = () => {
  return {
    rowHandle: {
      width: 140,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '查看详情',
          emit: 'checkDetail',
          type: 'text',
          size: 'small'
        }
      ]
    },
    pagination: {
      background: false
    },
    options: {
      // border: false,
      // stripe: false,
      headerCellStyle: { 'background-color': '#F7F7F7', border: '1px solid #EBEEF5' }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '直播间名称',
        key: 'name',
        width: 400,
        search: {
          disabled: false
        }
      },
      {
        title: '开播时间',
        key: 'startTime',
        rowSlot: true
        // type: 'datetime'
      },
      {
        title: '直播状态',
        key: 'liveStatus',
        type: 'select',
        search: {
          disabled: false
        },
        dict: {
          data: [
            // todo 颜色
            {
              value: 0,
              label: '未开始'
            },
            {
              value: 1,
              label: '直播中'
            },
            {
              value: 2,
              label: '回放中'
            },
            {
              value: 3,
              label: '已结束'
            },
            {
              value: 4,
              label: '等待中'
            }
          ]
        }
      },
      {
        title: '观众人数',
        key: 'audienceNum'
      },
      {
        title: '完成人数',
        key: 'completedNum'
      },
      {
        title: '直播场景',
        key: 'newScene'
      },
      {
        title: '所属组织',
        key: 'orgShortName'
      },
      {
        title: '学员地区',
        key: 'addressCode',
        show: false,
        search: {
          slot: true
        }
      }
    ]
  }
}
