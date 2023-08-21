<template>
  <svg class="svg-icon" aria-hidden="true" color="red">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    fill: {
        type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  },
  created () {
    console.log(this.fill)
  }
}
</script>

<style>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  /* fill: fill; */
}
</style>
