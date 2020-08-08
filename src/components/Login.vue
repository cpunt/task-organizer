<template>
<div class='card card-body signinDiv'>
  <img class='float-left icon' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>

  <div class='text-center mt-5'>
    <p class="google btn" @click='login'>
      <i class="fa fa-google fa-fw"></i> Login with Google+
    </p>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapActions('display', [
      'cancel'
    ]),
  }
}
</script>

<style scoped>
.signinDiv {
  position: absolute;
  width: 60%;
  z-index:100;
  top: 4%;
  left: 20%;
  height: 200px;
}

.icon {
  cursor: pointer;
  height: 24px;
  width: 24px;
  position: absolute;
}

.btn {
  width: 50%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
}

input:hover, .btn:hover {
  opacity: 1;
}

.google {
  background-color: #dd4b39;
  color: white;
}
</style>
