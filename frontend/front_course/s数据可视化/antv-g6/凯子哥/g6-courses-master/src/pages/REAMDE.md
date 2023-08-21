# api
[获取当前元素的所有状态 - getStates](https://g6.antv.vision/zh/docs/api/Items/itemMethods)
[根据节点的状态查找节点 - findAllByState](https://g6.antv.vision/zh/docs/api/graphFunc/find/#graphgetnodes)


# todo
* 事件如何获取节点当前[元素状态](https://g6.antv.vision/zh/docs/api/graphFunc/state/#graphsetitemstateitem-state-value)?
  * 推测状态是堆叠去重的
  * 测试代码给元素设置状态：selected, click, hover
    * graph.getNodes()._cfg.states => [ "selected", "click", "hover" ]
    * node.node.getStates()        => [ "selected", "click", "hover" ]
  * 测试代码给元素设置状态：hover, click, hover
    * graph.getNodes()._cfg.states => [ "hover", "click" ]
    * node.node.getStates()        => [ "hover", "click" ]
    * 第二次机设置hover之前有判断，已存在就不再push了

* graph.getNodes().forEach(item.. item如何获取id
* 直接修改数据源，如表是不是会响应?
  * 不响应的话如何，图如何更新?
* canvas:click 和 node:click 容器和事件关系，什么触发顺序?
