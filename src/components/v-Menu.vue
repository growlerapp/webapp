<template>
  <div class="Menu" :class="{'is-active': $store.state.isMenuActive}" v-hammer:pan.left="panToLeft">
    <div class="Menu-backdrop" @click="closeMenu"></div>

    <div class="Menu-body">
      <div class="Menu-body-bg"></div>
      <div class="Menu-body-line"></div>

      <ul class="Menu-list">
        <li class="Menu-item">
          <router-link to=/ @click.native="closeMenu">
            <h3>Inicio</h3>
            <span>volver</span>
          </router-link>
        </li>
        <li class="Menu-item">
          <router-link to=/about @click.native="closeMenu">
            <h3>Acerca</h3>
            <span>de GrowlerApp</span>
          </router-link>
        </li>
        <li class="Menu-item is-disabled">
          <h3>Agregar</h3>
          <span>un nuevo bar (pronto)</span>
        </li>
        <!-- <li class="Menu-item">
          <h3>Términos</h3>
          <span>y condiciones</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

export default {
  name: 'v-Menu',

  directives: {
    clickOutside: vClickOutside.directive
  },

  methods: {
    closeMenu () {
      if (this.$store.state.isMenuActive) {
        this.$store.commit('setMenu', false)
      }
    },

    panToLeft () {
      this.$store.commit('setMenu', false)
    }
  }
}
</script>

<style>
.Menu {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
}

.Menu.is-active {
  pointer-events: all;
}

.Menu-backdrop {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.Menu.is-active .Menu-backdrop {
  opacity: 1;
}

.Menu-body {
  background: var(--color-red);
  width: 60%;
  max-width: 240px;
  position: absolute;
  top: 0;
  bottom: 0;
  transition: transform 0.4s ease;
  transform: translateX(-104%);
}

.Menu-body-bg {
  width: 260px;
  height: 220px;
  position: fixed;
  bottom: 0;
  background-repeat: no-repeat;
  left: -130px;
  opacity: 0.6;
}

.Menu-body-line {
  background-image: url(/img/img-line-vertical.svg);
  background-repeat: repeat-y;
  position: absolute;
  top: 0;
  width: 30px;
  height: 102%;
  background-size: contain;
  z-index: 1;
  right: -7px;
  bottom: 0;
}

.Menu.is-active .Menu-body {
  transform: translateX(0);
}

.Menu-list {
  color: var(--color-white);
  list-style: none;
  padding: 20px 30px;
}

@media (--sm-viewport) {
  .Menu-list {
    padding: 20px 40px;
  }
}

.Menu-item.is-disabled {
  opacity: .4;
}

.Menu-item h3 {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 1.6rem;
  letter-spacing: 1px;
}

.Menu-item span {
  font-family: var(--font-family-normal);
  font-size: 1rem;
}

.Menu-item a {
  color: inherit;
}
</style>
