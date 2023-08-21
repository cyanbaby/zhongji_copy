<template>
  <div>
    <h1>Home组件</h1>
    <br />
    <br />
    <Login />
    <br />
    <hr />
    <br />
    <Search />
    <br />
    <hr />
    <br />
    <User :msg="msg" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import Login from "./Login.vue";
import Search from "./Search.vue";
import User from "./User.vue";
export default {
  name: "Home组件",
  data() {
    return {
      msg: "我是home组件的msg",
    };
  },
  methods: {
    run() {
      alert("run");
    },
  },
  components: {
    Login,
    Search,
    User,
  },
};
</script>
