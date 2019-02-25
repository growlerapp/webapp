<template>
  <div class="Header">
    <div class="Header-left">
      <transition name="fade">
        <template v-if="this.$store.state.isInStore">
          <router-link to="/home">
            <i class="ico-arrow-left"></i>
          </router-link>
        </template>
      </transition>
    </div>

    <v-menu/>

    <div class="Header-logo">
      <logo/>
    </div>

    <div class="Header-menu" @click="openMenu">
      <div class="Header-menu-icon" v-hammer:pan.right="panToRight">
        <i class="ico-menu-dots"></i>
      </div>
    </div>

    <div class="Header-line"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { VueHammer } from 'vue2-hammer'
import Logo from '@/components/Logo'
import vMenu from '@/components/v-Menu'
Vue.use(VueHammer)

export default {
  name: 'Header',

  components: {
    Logo,
    vMenu
  },

  methods: {
    openMenu () {
      this.$store.commit('setMenu', true)
    },

    panToRight () {
      this.$store.commit('setMenu', true)
    }
  }
}
</script>

<style scoped>
.Header {
  background: var(--color-red);
  padding: 18px 0 14px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
}

.Header-left {
  position: absolute;
  top: 22px;
  left: 20px;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-white);
  opacity: .8;
}

.Header-left a {
  color: var(--color-white);
}

.Header-line {
  background-image: url(/img/img-line.svg);
  background-repeat: repeat-x;
  position: absolute;
  bottom: -3px;
  width: 100%;
  height: 10px;
  background-size: contain;
  z-index: 1;
}

.Header-menu-icon {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 2rem;
  transform: rotate(90deg);
  cursor: pointer;
  color: var(--color-white);
  opacity: .8;
}

.Header-menu-icon i {
  display: block;
}

.Header-logo {
  padding-top: 2px;
}
</style>
