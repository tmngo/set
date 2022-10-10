<template>
  <div 
    class="card"
    :class="{'blank': card.count === -1, 
      'selected': selected !== -1,}"
  >
  <div>
      <svg 
        v-show="!isLoading" 
        viewBox="0 0 120 120"
        :style="{
          'transform': `rotateZ(${rotation}deg)`,
        }"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern :id="`hatch`" 
          width="5" 
          height="5" 
          patternTransform="rotate(45 0 0)" 
          patternUnits="userSpaceOnUse"
        >
          <rect width="5" height="5" fill="black" />
          <line x1="0" y1="0" x2="0" y2="5" 
            stroke="white" 
            stroke-width="2px"
          />
        </pattern>
        <mask id="hatch-mask" width="5" height="5" >
          <rect x="-150" y="-150" width="300" height="300" 
          :fill="patternUrl" />
        </mask>
        <component
          :is="shapeComponents[card.shape]"
          v-for="(n, i) in card.count+1"
          :key="i"
          :x="30"
          :y="45-card.count*20 + i*40"
          :w="60"
          :h="30"
          :card="card"
          :color="color"
          :fill="fill[card.shading]"
          :mask="mask[card.shading]"
        />
      </svg>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import SetDiamond from "./SetDiamond.vue"
import SetOval from "./SetOval.vue"
import SetSquiggle from "./SetSquiggle.vue"

export default {
  name: 'SetCard',
  components: {
    SetDiamond,
    SetOval,
    SetSquiggle,
  },
  props: {
    card: Object,
    selected: Number,
    color: String,
    isLoading: Boolean,
    rotation: Number,
  },
  data() {
    return {
      shapeComponents: [SetDiamond, SetOval, SetSquiggle],
    }
  },
  computed: {
    fill() {
      return ['#fff',
        this.color,
        this.color,
      ];
    },
    mask() {
      return ['none',
        'none',
        `url(${location.protocol}//${location.host}${location.pathname}#hatch-mask)`,
      ];
    },
    patternUrl() {
      return `url(${location.protocol}//${location.host}${location.pathname}#hatch)`
    }
  },
}
</script>

<style scoped>
.card {
  background: #ffffff;
  touch-action: manipulation;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 10%;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.1s cubic-bezier(.25,.8,.25,1);
  border: 0.25rem #f0f0f0 double;
  overflow: hidden;
}

.selected {
  border-color: #808080;
  box-shadow: 0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22);
  transform: translateY(-2px);
}

@media screen and (min-width: 600px) and (hover:hover) {
  .card:hover {
    border-color: #808080;
    box-shadow: 0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22);
    transform: translateY(-2px);
  }
}

.card:active {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transform: translateY(1px);
}

.card > div {
  position: relative;
  width: 100%;
  height: 100%;
}

svg {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
