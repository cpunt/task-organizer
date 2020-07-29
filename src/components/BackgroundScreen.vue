<template>
<div class='backgroundScreen' @click='cancel'>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BackgroundScreen',
  methods: {
    ...mapActions('display', [
      'cancel'
    ])
  }
}
</script>

<style scoped>
.backgroundScreen {
  position:fixed;
  padding:0;
  margin:0;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,0.5);
  z-index: 10;
}
</style>
