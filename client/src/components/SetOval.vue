<template>
  <g>
    <rect 
      :x="x"
      :y="y"
      :rx="h/2"
      :width="w" 
      :height="h" 
      :fill="fill"
      :mask="mask"
    />
    <rect 
      :x="x"
      :y="y"
      :rx="h/2"
      :width="w" 
      :height="h" 
      fill="none"
      :stroke="color"
      stroke-width="3px"
    />
  </g>
</template>

<script>

export default {
  name: 'SetOval',
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
