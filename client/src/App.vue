<template>
  <div id="app">
    <set-game></set-game>
  </div>
</template>

<script>
import SetGame from './components/SetGame.vue'

export default {
  name: 'app',
  components: {
    SetGame
  }
}
</script>

<style>
html {
  height: 100%;
  margin: 0;
  touch-action: manipulation;
}
*, 
::after, 
::before {
  box-sizing: border-box;
}
body {
  font-family: 'Fira Sans', sans-serif;
  height: 100%;
  margin: 0;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
