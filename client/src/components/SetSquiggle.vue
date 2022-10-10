<template>
  <g :style="{'transform': `translate(${50}%, ${0.75*y+15}%)`}">
    <path
      :d="d"
      :fill="fill"
      :mask="mask"
    />
    <path
      :d="d"
      fill="none"
      :stroke="color"
      stroke-width="3px"
    />
  </g>
</template>

<script>

export default {
  name: 'SetSquiggle',
  props: {
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    card: Object,
    color: String,
    fill: String,
    mask: String,
  },
  computed: {
    d() {
      return `M ${-14} ${14} `
          + `C -2 14, -2 8, 10 8 `
          + `C 22 8, 20 14, 28 14 `
          + `C 40 14, 30 -14, 14 -14 `
          + `C 2 -14, 2 -8, -10 -8 `
          + `C -22 -8, -20 -14, -28 -14 `
          + `C -40 -14, -30 14, -14 14`;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
