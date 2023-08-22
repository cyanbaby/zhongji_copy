<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
const res = [
  {
    depId: 'c25ppi32j280',
    orgId: '8065100165',
    depIconUrl: null,
    depFullName: '华南大区市场运营部',
    depShortName: '华南大区市场运营部',
    parentDepId: '-1',
    depSort: 10,
    subDepList: [
      {
        depId: 'c25psvb3mtxc',
        orgId: '8065100165',
        depIconUrl: null,
        depFullName: '湖南地区',
        depShortName: '湖南地区',
        parentDepId: 'c25ppi32j280',
        depSort: 10,
        subDepList: [
          {
            depId: '1624951349777141760',
            orgId: '8065100165',
            depIconUrl: null,
            depFullName: '长沙市',
            depShortName: '长沙',
            parentDepId: 'c25psvb3mtxc',
            depSort: 0,
            subDepList: null
          }
        ]
      }
    ]
  },
  {
    depId: '1594873574489415680',
    orgId: '8065100165',
    depIconUrl: null,
    depFullName: '一级部门',
    depShortName: '一级部门',
    parentDepId: '-1',
    depSort: 0,
    subDepList: null
  },
  {
    depId: '1627954462389833728',
    orgId: '8065100165',
    depIconUrl: null,
    depFullName: '北京',
    depShortName: '北京',
    parentDepId: '-1',
    depSort: 0,
    subDepList: [
      {
        depId: '1627959496322191360',
        orgId: '8065100165',
        depIconUrl: null,
        depFullName: '北京市',
        depShortName: '北京市',
        parentDepId: '1627954462389833728',
        depSort: 0,
        subDepList: [
          {
            depId: '1627959654871076864',
            orgId: '8065100165',
            depIconUrl: null,
            depFullName: '东城区',
            depShortName: '东城区',
            parentDepId: '1627959496322191360',
            depSort: 0,
            subDepList: [
              {
                depId: '1627959840309645312',
                orgId: '8065100165',
                depIconUrl: null,
                depFullName: '东华门',
                depShortName: '东华门',
                parentDepId: '1627959654871076864',
                depSort: 0,
                subDepList: null
              }
            ]
          }
        ]
      }
    ]
  }
]
export default {
  name: 'TestElementUiDemo12View',
  data() {
    return {
      data: res,
      defaultProps: {
        children: 'subDepList',
        label: 'depFullName'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
