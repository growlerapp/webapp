<template>
  <div class="Loading" :class="[_type, _color]"></div>
</template>

<script>
export default {
  name: 'Loading',

  props: ['type', 'color'],

  computed: {
    _type () {
      return {
        'Loading--top': this.type === 'top',
        'Loading--relative': this.type === 'relative',
        'Loading--left': this.type === 'left'
      }
    },

    _color () {
      return {
        'Loading--colorWhite': this.color === 'white'
      }
    }
  }
}
</script>

<style scoped>
.Loading {
  background-image: url(/img/img-hop.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation-name: rotate-loading;
  animation-duration: 2200ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  position: fixed;
  width: 36px;
  height: 36px;
  top: 50%;
  left: 50%;
  z-index: 10;
  margin-left: -18px;
}

.Loading--colorWhite {
  background-image: url(/img/img-hop-white.svg);
}

.Loading--relative {
  position: relative;
  margin: 20px 0 0;
  left: auto;
  right: auto;
}

.Loading--left {
  position: relative;
  margin: 20px 0 0;
  left: auto;
}

.Loading--top {
  position: fixed;
  top: 20px;
  right: 20px;
  left: auto;
  margin: 0;
}

.is-loaded .Loading {
  display: none;
}

@keyframes rotate-loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
