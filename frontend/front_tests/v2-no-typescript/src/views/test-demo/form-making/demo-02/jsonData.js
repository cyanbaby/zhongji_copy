export default {
  list: [
    {
      type: 'input',
      icon: 'icon-input',
      options: {
        width: '',
        defaultValue: 'Hello',
        required: true,
        requiredMessage: '',
        dataType: '',
        dataTypeCheck: false,
        dataTypeMessage: '',
        pattern: '',
        patternCheck: false,
        patternMessage: '',
        validatorCheck: false,
        validator: '',
        placeholder: '',
        customClass: '',
        disabled: false,
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        showPassword: false,
        remoteFunc: 'func_mtg8he9g',
        remoteOption: 'option_mtg8he9g',
        tableColumn: false
      },
      events: {
        onChange: '',
        onFocus: '',
        onBlur: ''
      },
      name: 'Activity name',
      key: 'mtg8he9g',
      model: 'name',
      rules: [
        {
          required: true,
          message: ' required'
        }
      ]
    },
    {
      type: 'select',
      icon: 'icon-select',
      options: {
        defaultValue: '',
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: 'Activity zone',
        required: true,
        requiredMessage: '',
        validatorCheck: false,
        validator: '',
        showLabel: true,
        width: '',
        options: [
          {
            value: 'shanghai',
            label: 'Zone one'
          },
          {
            value: 'beijing',
            label: 'Zone two'
          }
        ],
        remote: false,
        remoteType: 'datasource',
        remoteOption: 'option_4wkx6fyp',
        filterable: false,
        remoteOptions: [],
        props: {
          value: 'value',
          label: 'label'
        },
        remoteFunc: 'func_4wkx6fyp',
        customClass: '',
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        tableColumn: false
      },
      events: {
        onChange: '',
        onFocus: '',
        onBlur: ''
      },
      name: 'Activity zone',
      key: '4wkx6fyp',
      model: 'region',
      rules: [
        {
          required: true,
          message: ' required'
        }
      ]
    },
    {
      type: 'group',
      icon: 'icon-fenzu',
      options: {
        defaultValue: {},
        customClass: 'group-margin-0 reuqired-label',
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        width: '',
        validatorCheck: false,
        validator: '',
        remoteFunc: 'func_8ys9cm0d',
        remoteOption: 'option_8ys9cm0d',
        tableColumn: false,
        subform: false
      },
      list: [
        {
          type: 'inline',
          icon: 'icon-inlineview',
          options: {
            customClass: '',
            hidden: false,
            remoteFunc: 'func_u0m7oafr',
            remoteOption: 'option_u0m7oafr',
            tableColumn: false,
            spaceSize: 10,
            subform: false
          },
          list: [
            {
              type: 'date',
              icon: 'icon-date',
              options: {
                defaultValue: '',
                readonly: false,
                disabled: false,
                editable: true,
                clearable: true,
                placeholder: '',
                startPlaceholder: '',
                endPlaceholder: '',
                type: 'date',
                format: 'YYYY-MM-DD',
                timestamp: false,
                required: true,
                requiredMessage: '',
                validatorCheck: false,
                validator: '',
                width: '',
                customClass: '',
                labelWidth: 100,
                isLabelWidth: false,
                hidden: false,
                dataBind: true,
                remoteFunc: 'func_ccpabuqb',
                remoteOption: 'option_ccpabuqb',
                hideLabel: true
              },
              events: {
                onChange: '',
                onFocus: '',
                onBlur: ''
              },
              name: 'Activity time',
              key: 'ccpabuqb',
              model: 'date',
              rules: [
                {
                  required: true,
                  message: ' required'
                }
              ]
            },
            {
              type: 'time',
              icon: 'icon-time',
              options: {
                defaultValue: '',
                readonly: false,
                disabled: false,
                editable: true,
                clearable: true,
                placeholder: '',
                startPlaceholder: '',
                endPlaceholder: '',
                isRange: false,
                arrowControl: false,
                format: 'HH:mm:ss',
                required: true,
                requiredMessage: '',
                validatorCheck: false,
                validator: '',
                width: '',
                customClass: '',
                labelWidth: 100,
                isLabelWidth: false,
                hidden: false,
                dataBind: true,
                remoteFunc: 'func_263i2dxc',
                remoteOption: 'option_263i2dxc',
                hideLabel: true
              },
              events: {
                onChange: '',
                onFocus: '',
                onBlur: ''
              },
              name: 'Time',
              key: '263i2dxc',
              model: 'time',
              rules: [
                {
                  required: true,
                  message: ' required'
                }
              ]
            }
          ],
          name: 'Inline',
          key: 'u0m7oafr',
          model: 'inline_u0m7oafr',
          rules: []
        }
      ],
      name: 'Activity time',
      key: '8ys9cm0d',
      model: 'activity',
      rules: []
    },
    {
      type: 'switch',
      icon: 'icon-switch',
      options: {
        defaultValue: false,
        required: false,
        requiredMessage: '',
        validatorCheck: false,
        validator: '',
        disabled: false,
        customClass: '',
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        width: '',
        remoteFunc: 'func_g3yj845o',
        remoteOption: 'option_g3yj845o',
        tableColumn: false
      },
      events: {
        onChange: ''
      },
      name: 'Instant delivery',
      key: 'g3yj845o',
      model: 'delivery',
      rules: []
    },
    {
      type: 'checkbox',
      icon: 'icon-check-box',
      options: {
        inline: true,
        defaultValue: [],
        showLabel: false,
        options: [
          {
            value: 'Online activities'
          },
          {
            value: 'Promotion activities'
          },
          {
            value: 'Offline activities'
          },
          {
            value: 'Simple brand exposure'
          }
        ],
        required: true,
        requiredMessage: '',
        validatorCheck: false,
        validator: '',
        width: '',
        remote: false,
        remoteType: 'datasource',
        remoteOption: 'option_c0ut8emu',
        remoteOptions: [],
        props: {
          value: 'value',
          label: 'label'
        },
        remoteFunc: 'func_c0ut8emu',
        customClass: '',
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        disabled: false,
        tableColumn: false
      },
      events: {
        onChange: ''
      },
      name: 'Activity type',
      key: 'c0ut8emu',
      model: 'type',
      rules: [
        {
          required: true,
          message: ' required'
        }
      ]
    },
    {
      type: 'radio',
      icon: 'icon-radio-active',
      options: {
        inline: false,
        defaultValue: '',
        showLabel: false,
        options: [
          {
            value: 'Sponsorship',
            label: 'Option 1'
          },
          {
            value: 'Venue',
            label: 'Option 2'
          }
        ],
        required: true,
        requiredMessage: '',
        validatorCheck: false,
        validator: '',
        width: '',
        remote: false,
        remoteType: 'datasource',
        remoteOption: 'option_18benqfi',
        remoteOptions: [],
        props: {
          value: 'value',
          label: 'label'
        },
        remoteFunc: 'func_18benqfi',
        customClass: '',
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        disabled: false,
        tableColumn: false
      },
      events: {
        onChange: ''
      },
      name: 'Resources',
      key: '18benqfi',
      model: 'resource',
      rules: [
        {
          required: true,
          message: ' required'
        }
      ]
    },
    {
      type: 'textarea',
      icon: 'icon-diy-com-textarea',
      options: {
        width: '',
        defaultValue: '',
        required: true,
        requiredMessage: '',
        disabled: false,
        pattern: '',
        patternMessage: '',
        validatorCheck: false,
        validator: '',
        placeholder: '',
        customClass: '',
        labelWidth: 100,
        isLabelWidth: false,
        hidden: false,
        dataBind: true,
        remoteFunc: 'func_qh2mxnfq',
        remoteOption: 'option_qh2mxnfq',
        tableColumn: false
      },
      events: {
        onChange: '',
        onFocus: '',
        onBlur: ''
      },
      name: 'Activity form',
      key: 'qh2mxnfq',
      model: 'desc',
      rules: [
        {
          required: true,
          message: ' required'
        }
      ]
    },
    {
      type: 'inline',
      icon: 'icon-inlineview',
      options: {
        customClass: 'center',
        hidden: false,
        spaceSize: 10,
        remoteFunc: 'func_1209c0xf',
        remoteOption: 'option_1209c0xf',
        tableColumn: false,
        subform: false
      },
      list: [
        {
          type: 'button',
          icon: 'icon-button',
          options: {
            customClass: '',
            disabled: false,
            labelWidth: 100,
            isLabelWidth: false,
            hideLabel: true,
            hidden: false,
            dataBind: false,
            buttonSize: 'default',
            buttonType: 'primary',
            buttonPlain: false,
            buttonRound: false,
            buttonCircle: false,
            buttonName: 'Create',
            width: '',
            remoteFunc: 'func_v2ouin49',
            remoteOption: 'option_v2ouin49',
            subform: false,
            tableColumn: false
          },
          events: {
            onClick: 'g88osh09'
          },
          name: '',
          key: 'v2ouin49',
          model: 'button_v2ouin49',
          rules: []
        },
        {
          type: 'button',
          icon: 'icon-button',
          options: {
            customClass: '',
            disabled: false,
            labelWidth: 100,
            isLabelWidth: false,
            hideLabel: true,
            hidden: false,
            dataBind: false,
            buttonSize: 'default',
            buttonType: '',
            buttonPlain: false,
            buttonRound: false,
            buttonCircle: false,
            buttonName: 'Reset',
            width: '',
            remoteFunc: 'func_y02fdw3r',
            remoteOption: 'option_y02fdw3r',
            subform: false,
            tableColumn: false
          },
          events: {
            onClick: '4to95t4e'
          },
          name: 'Button',
          key: 'y02fdw3r',
          model: 'button_y02fdw3r',
          rules: []
        }
      ],
      name: 'Inline',
      key: '1209c0xf',
      model: 'inline_1209c0xf',
      rules: []
    }
  ],
  config: {
    labelWidth: 120,
    labelPosition: 'right',
    size: 'default',
    customClass: '',
    ui: 'element',
    layout: 'horizontal',
    labelCol: 3,
    width: '100%',
    hideLabel: false,
    hideErrorMessage: false,
    eventScript: [
      {
        key: 'mounted',
        name: 'mounted',
        func: ''
      },
      {
        key: '4to95t4e',
        name: 'onClick_4to95t4e',
        func: 'this.reset()'
      },
      {
        key: 'g88osh09',
        name: 'onClick_g88osh09',
        func: "this.getData().then(data => {\n  this.$alert(data, 'Form data')\n})"
      }
    ],
    dataSource: [
      {
        key: 'upload',
        name: 'Get Upload Token',
        url: 'https://tools-server.making.link/api/uptoken',
        method: 'GET',
        auto: true,
        responseFunc: 'return res.uptoken;'
      },
      {
        key: 'getoptions',
        name: 'Get Options',
        url: 'https://tools-server.making.link/api/new/options',
        method: 'GET',
        auto: true,
        responseFunc: 'return res.data;'
      }
    ],
    platform: 'pad',
    styleSheets:
      '.group-margin-0 {\n  margin-bottom: 0 !important;\n}\n\n.reuqired-label .el-form-item__label::before{\n  content: "*";\n  color: #F56C6C;\n  margin-right: 4px;\n}\n\n.center{\n  text-align: center;\n}',
    labelSuffix: true
  }
}
