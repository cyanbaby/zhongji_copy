<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy :expand-on-click-node="false"> </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TestElementUiDemo13View',

  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [
          {
            name: 'leaf',
            leaf: true // leaf就表示已经为叶子节点了，'left' 也可以通过 props.isLeat 指定
          },
          {
            name: 'zone',
            leaf: false // leaf就表示已经为叶子节点了，'left' 也可以通过 props.isLeat 指定
          }
        ]

        resolve(data)
      }, 500)
    }
  }
}
</script>
