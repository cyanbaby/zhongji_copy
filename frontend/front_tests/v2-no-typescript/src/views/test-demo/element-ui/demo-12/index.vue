<template>
  <div>
    <!-- <el-tree
      :data="data"
      :props="defaultProps"
      node-key="depId"
      :default-expanded-keys="[
        'c25ppi32j280',
        '1594873574489415680',
        '1627954462389833728'
      ]"
      @node-click="handleNodeClick"
    ></el-tree> -->

    <pre style="position: absolute; right: 0; z-index: 1">
      {{ JSON.stringify(data, null, 4) }}
    </pre>

    <p>使用 render-content</p>
    <el-select v-model="value" placeholder="请选择">
      <div slot="empty">
        <!-- TODO 一个很好地想法呀 -->
        <el-input type="text" v-model="inputVal" />
        <el-tree
          ref="treeRef"
          :data="data"
          :props="defaultProps"
          node-key="depId"
          :expand-on-click-node="false"
          :default-expanded-keys="[
            'c25ppi32j280',
            '1594873574489415680',
            '1627954462389833728'
          ]"
          :render-content="renderContent"
          :highlight-current="true"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
    </el-select>

    <!--
    <p>使用 scoped slot</p>
    <el-tree
      :data="data"
       :props="defaultProps"
      node-key="depId"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
    -->
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
  },
  {
    depId: '15948735744894156801',
    orgId: '80651001651',
    depIconUrl: null,
    depFullName: '一级部门1',
    depShortName: '一级部门1',
    parentDepId: '-1',
    depSort: 0,
    subDepList: null
  }
]
let id = 1000

export default {
  name: 'TestElementUiDemo12View',
  data() {
    return {
      value: '',
      data: res,
      defaultProps: {
        children: 'subDepList',
        label: 'depFullName'
      },
      inputVal: ''
    }
  },
  created() {},
  methods: {
    handleNodeClick(data) {
      // console.log(data)
      this.value = data.depFullName
    },
    append(data) {
      const newChild = { depId: id++, depFullName: 'testtest', subDepList: [] }
      if (!data.subDepList) {
        this.$set(data, 'subDepList', [])
      }
      data.subDepList.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const subDepList = parent.data.subDepList || parent.data
      const index = subDepList.findIndex((d) => d.depId === data.depId)
      subDepList.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>
