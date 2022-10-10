<template>
  <g>
    <polygon
      :points="points"
      :fill="fill"
      :mask="mask"
    />
    <polygon
      :points="points"
      fill="none"
      :stroke="color"
      stroke-width="3px"
    />
  </g>
</template>

<script>

export default {
  name: 'SetDiamond',
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
    points() {
      let x = this.x;
      let y = this.y;
      let w = this.w;
      let h = this.h;
      return `${x+w/2},${y} `
          + `${x},${y+h/2} `
          + `${x+w/2},${y+h} `
          + `${x+w},${y+h/2}`
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
